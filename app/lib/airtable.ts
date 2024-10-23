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
      ...record.fields,
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

  return records[0];
};
