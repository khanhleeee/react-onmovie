class Movie {
    // constructor(title, subtitle, description, trailer, video, genre, year, limit, isSeries) {
    //     this.title = title;
    //     this.subtitle = subtitle;
    //     this.description = description;
    //     this.trailer = trailer;
    //     this.video = video;
    //     this.genre = genre;
    //     this.year = year;
    //     this.limit = limit;
    //     this.isSeries = isSeries;
    // }
    constructor(idphong, tenphong, giaphong) {
        this.idphong = idphong;
        this.tenphong = tenphong;
        this.giaphong = giaphong;
    }
}

module.exports = Movie;