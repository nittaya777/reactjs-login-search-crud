const address_full = (props) => {
  const {
    province_id,
    address,
    subdistrict_name,
    district_name,
    province_name,
    zip_code,
  } = props;
  if (province_id === 1) {
    return `${address} แขวง${subdistrict_name} ${district_name} จังหวัด${province_name} ${zip_code}`;
  } else {
    return `${address} ตำบล${subdistrict_name} อำเภอ${district_name} จังหวัด${province_name} ${zip_code}`;
  }
};

export { address_full };
