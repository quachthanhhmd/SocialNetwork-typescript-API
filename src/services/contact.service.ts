import db from "../models/index";
import Contact from "../models/contacts";
import pick from "../utils/pick";

import { IContact } from "../interfaces/contact.interface";


// const getContactById = async(userId: number) : Promise<Contact | null> =>{


//     return await Contact.findOne({
//         where: {
//             userId: userId,
//         }
//     })
// }

/**
 * from object, we will pick key of object and return it
 * @param {object} AnyObject 
 * @returns 
 */
const pickFeildOfContact = (AnyObject: object): IContact => {

    return pick(AnyObject, ['email', 'github', 'linkedin', 'phoneNumber', 'skype']);
};

const findContactByProfileId = async (profileId: number) => {

    return await Contact.findOne({
        where: {
            profileId: profileId,
        }
    });
}

const findContactByUserId = async (userId: number) => {


    return await db.Contact.findOne({
        include: [{
            model: db.UserProfile,
            include: [{
                model: db.User,
                where: {
                    id: userId,
                }
            }]
        }]
    })
}

/**
 * Create contact
 * @param profileId 
 * @param contactBody 
 */
const createContact = async (profileId: number, contactBody: any): Promise<void> => {

    Object.assign(contactBody, {profileId});

    await Contact.create(contactBody);
}

/**
 * Update contact by profiel Id and any object 
 * @param {number} profileId 
 * @param {object} updateBody
 * @return {Promise<void>} 
 */
const updateContactByProfileId = async (profileId: number, updateBody: object) : Promise<void>=> {

    const updateContactObject: IContact = pickFeildOfContact(updateBody);

    //at contact, we need to check if it has been created or not
    const contactExist = await findContactByProfileId(profileId);

    //if not, create it
    if (!contactExist) {
        await createContact(profileId, updateContactObject);
    }

    await Contact.update(
        updateContactObject,
        {
            where: {
                profileId: profileId,
            }
        }
    )

}

export default {
    pickFeildOfContact,
    findContactByUserId,
    updateContactByProfileId
}