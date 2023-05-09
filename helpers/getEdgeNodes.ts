const getEdgeNodes = (tinaData: any) => {
  if (tinaData.length === 0) {
    return [];
  }
  return tinaData.data.postConnection.edges
    ?.map((edge: any) => edge?.node)
    .reverse();
};

export default getEdgeNodes;
