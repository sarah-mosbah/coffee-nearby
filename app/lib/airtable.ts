import { AirTableRecordType, CoffeeStoreType } from "../types";
import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  "appt7KiwlOeL9vTTl"
);

const table = base("tblZNj9usH3RaeHbE");

export const findRecordByFilter = async (id: string) => {
  const records = await table
    .select({
      filterByFormula: `{id} = '${id}'`,
    })
    .firstPage();

  const allRecords: AirTableRecordType[] = records.map((record) => ({
    fields: {
      id,
      name: record.fields.name as string,
      address: record.fields.address as string,
      imageUrl: record.fields.imageUrl as string,
      voting: record.fields.voting as number,
    },
    recordId: record.id,
    id,
  }));

  return allRecords;
};

export const createCoffeeStore = async (
  id: string,
  coffeeStore: CoffeeStoreType
) => {
  const records = await findRecordByFilter(id);

  if (records.length == 0) {
    const createNewRecord = (await table.create({
      id,
      name: coffeeStore.name,
      address: coffeeStore.address,
      imageUrl: coffeeStore.imageUrl,
      voting: coffeeStore.voting ?? 0,
    })) as unknown as AirTableRecordType;

    return { ...createNewRecord.fields, recordId: createNewRecord.id };
  }

  return { ...records[0].fields, recordId: records[0].id };
};

export const updateCoffeeStore = async (id: string) => {
  try {
    if (id) {
      const records = await findRecordByFilter(id);
      if (records.length !== 0) {
        const record = records[0];
        const updatedVoting = record.fields.voting + 1;

        const updatedRecords = (await table.update([
          {
            id: record.recordId,
            fields: {
              voting: updatedVoting,
            },
          },
        ])) as unknown as AirTableRecordType[];

        if (updatedRecords.length > 0) {
          return getMinifiedRecords(updatedRecords);
        }
      } else {
        console.log("Coffee store does not exist");
      }
    } else {
      console.error("Store id is missing");
    }
  } catch (error) {
    console.error("Error upvoting a coffee store", error);
  }
};

const getMinifiedRecords = (records: Array<AirTableRecordType>) => {
  return records.map((record) => {
    return {
      recordId: record.id,
      ...record.fields,
    };
  });
};
