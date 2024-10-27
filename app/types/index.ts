export type MapBoxType = {
  id: string;
  text: string;
  properties: {
    address: string;
  };
};

export type CoffeeStoreType = {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  voting: number;
};

export type AirTableRecordType = {
  fields: CoffeeStoreType;
  recordId: string;
  id: string;
};

export type Props = {
  params: { id: string };
  searchParams: { [id: string]: string };
};
