class Film {
  constructor(F_ID, F_NAME, F_RELEASEYEAR, F_LIMITEDAGE, F_AVGRATING, F_DESC, F_THUMBNAIL, S_ID, C_ID) {
    this.F_ID = F_ID;
    this.F_NAME = F_NAME;
    this.F_RELEASEYEAR = F_RELEASEYEAR;
    this.F_LIMITEDAGE = F_LIMITEDAGE;
    this.F_AVGRATING = F_AVGRATING;
    this.F_DESC = F_DESC;
    this.F_THUMBNAIL = F_THUMBNAIL;
    this.S_ID = S_ID;
    this.C_ID = C_ID;
  }
}

module.exports = Film;