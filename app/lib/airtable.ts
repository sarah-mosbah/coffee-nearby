import { AirTableRecordType, CoffeeStoreType } from "../types";

var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  "appt7KiwlOeL9vTTl"
);

const table = base("tblZNj9usH3RaeHbE");

export const findRecordByFilter = async (id: string) => {
  const records = await table
    .select({
      filterByFormula: `{id} = '${id}'`,
    })
    .firstPage();

  const allRecords: AirTableRecordType[] = records.map(
    (record: AirTableRecordType) => ({
      fields: { ...record.fields },
      recordId: record.id,
    })
  );

  return allRecords;
};

export const createCoffeeStore = async (
  id: string,
  coffeeStore: CoffeeStoreType
) => {
  const records = await findRecordByFilter(id);

  if (records.length == 0) {
    const createNewRecord = await table.create({
      id,
      name: coffeeStore.name,
      address: coffeeStore.address,
      imageUrl: coffeeStore.imageUrl,
      voting: coffeeStore.voting ?? 0,
    });

    return { ...createNewRecord.fields, recordId: createNewRecord.id };
  }

  return { ...records[0].fields, recordId: records[0].id };
};

export const updateCoffeeStore = async (id: string) => {
  try {
    const records = await findRecordByFilter(id);

    if (records.length != 0) {
      const voting = (records[0].fields.voting ?? 0) + 1;

      const updatedRecord = await table.update([
        {
          id: records[0].recordId,
          fields: {
            voting,
          },
        },
      ]);

      if (updatedRecord.length === 1) {
        console.log("Updated Store with Id", id);
        return { ...updatedRecord[0].fields, recordId: updatedRecord[0].id };
      } else {
        return {};
      }
    }

    return records[0];
  } catch (error) {
    console.error("Coffee Store Doesnt exist");
  }
};
