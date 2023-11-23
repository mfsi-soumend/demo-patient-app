class Patient {
  constructor(
    givenName,
    middleName,
    familyName,
    birthdate,
    birthdateEstimated,
    gender,
    preferred,
    address1,
    cityVillage,
    stateProvince,
    country,
    postalCode,
    phone
  ) {
    this.given_name = givenName;
    this.middle_name = middleName;
    this.family_name = familyName;
    this.birthdate = new Date(birthdate);
    this.birthdate_estimated = birthdateEstimated ? 1 : 0;
    this.gender = gender;
    this.preferred = preferred ? 1 : 0;
    this.address1 = address1;
    this.city_village = cityVillage;
    this.state_province = stateProvince;
    this.country = country;
    this.postal_code = postalCode;
    this.phone = phone;
  }
}

module.exports = Patient;
