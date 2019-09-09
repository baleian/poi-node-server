import * as service from '../services/address';

export function getGpsByAddress(req, res, next) {
    const { address } = req.body;
    service.exactAddressMatch(address, (result) => {
        res.send(result);
    });
}

export function getAddressByGps(req, res, next) {
    const { latitude, longitude } = req.body;
    service.nearestAddressByGps(latitude, longitude, (result) => {
        res.send(result);
    });
}
