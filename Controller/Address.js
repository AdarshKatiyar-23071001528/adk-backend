import { Address } from "../Model/Address.js";
export const addAddress = async (req, res) => {
    const userID = req.user;
    const { userFullName, userCity, userState, userAddress, userPhone, userPincode } = req.body;
    let address = await Address.findOne({ userID });
    if (!address) {
        address = new Address({ userID, fullAddress: [] });
        address.fullAddress.push({ userFullName, userCity, userState, userAddress, userPhone, userPincode });
    }
    else {
        address.fullAddress.push({ userFullName, userCity, userState, userAddress, userPhone, userPincode });
    }
    await address.save();
    res.json({ message: "Address Add successFull", address, success: true });
}

export const update = async (req, res) => {
    const { userFullName, userCity, userState, userAddress, userPhone, userPincode } = req.body;
    const { id } = req.params;
    const userID = req.user;
    try {
        const result = await Address.findOneAndUpdate(
            { userID: userID, "fullAddress._id": id },
            {
                $set: {
                    "fullAddress.$.userAddress": userAddress,
                    "fullAddress.$.userCity": userCity,
                    "fullAddress.$.userFullName": userFullName,
                    "fullAddress.$.userState": userState,
                    "fullAddress.$.userPincode": userPincode,
                    "fullAddress.$.userPhone": userPhone

                }
            },
            { new: true },
            { runValidators: true }
        );
        res.json({ message: "Address update sucessfully", updatedAddress: result, success: true });
    }
    catch (err) {
        res.json({ success: false, message: err.message, error: err });
    }
};


export const deleteAddresss = async (req, res) => {
    const { id } = req.params;
    const userID = req.user;
    try {
        const result = await Address.findOneAndUpdate(
            { userID: userID, "fullAddress._id": id },
            {
                $pull: {
                    fullAddress: { _id: id }
                }
            })
        res.json({ message: "deleted Address", updateAddres: result })
    } catch (error) {
        res.json({ message: error.message, success: true });
    }

}



export const allAddress = async (req, res) => {
    const userID = req.user;
    try {
        let address = await Address.findOne({ userID });
        if (!address) {
            address = new Address({ userID, fullAddress: [] });
        }
        res.json({ message: "all address", address, success: true });
    }
    catch (error) {
        res.json({ message: error.message, success: false });
    }

}


export const specificAddress = async (req, res) => {
    const userID = req.user;
    const { id } = req.params;
    try {
        let specificAdd = await Address.findOne({ userID });
        let isIndex = specificAdd.fullAddress.findIndex(address => address._id.toString() == id);
        specificAdd = specificAdd.fullAddress[isIndex];
        res.json({ message: "Specific Address", specificAdd, success: true });
    } catch (error) {
        res.json({ message: error.message, success: true });
    }

}