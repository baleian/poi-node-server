import * as model from '../models/address';
import kakao from '../utils/kakao';

export function exactAddressMatch(address, callback) {
    model.findByAddress(address, (err, result) => {
        if (err) throw err;
        callback(result);
    });
}

export function nearestAddressByGps(latitude, longitude, callback) {
    model.findByGps(latitude, longitude, (err, result) => {
        if (err) throw err;
        callback(result);
    });
}