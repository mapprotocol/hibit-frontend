export function jsonToChainList(jsonData: any) {
  return jsonData.map((item: any) => {
    const data = { ...item };
    try {
      data.metamask = JSON.parse(data.metamask);
    } catch (error) {
      console.log('Error parsing metamask: ', error);
      data.metamask = {};  // or some default value
    }
    try {
      console.log(data.nativeToken)
      data.nativeToken = JSON.parse(data.nativeToken);
    } catch (error) {
      console.log('Error parsing nativeToken: ', error);
      data.nativeToken = "";  // or some default value
    }
    return data;
  });
}