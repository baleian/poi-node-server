
export function findByAddress(address, callback) {
    // TODO: implement real data
    callback(null, {
        address: address,
        latitude: 36.000,
        longitude: 127.000
    });
}

export function findByGps(latitude, longitude, callback) {
    // TODO: implement real data
    callback(null, {
        address: '경기도 수원시 영통구 영통로290번길 25',
        latitude: 36.000,
        longitude: 127.000
    });
}
