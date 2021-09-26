import { IUserProfileAllField } from '../interfaces/userProfile.interface';
import faker from "faker";

import UserProfile from "../../../src/models/userProfile";
import User from "../../../src/models/user";






describe("UserProfile model test!!", () => {
    describe("UserProfile validation!", () => {

        let newProfile: IUserProfileAllField;

        beforeEach(() => {
            newProfile = {
                id: faker.datatype.number(100),
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                birthDay: faker.date.past(),
                gender: "female",
                avtImage: faker.internet.avatar(),
                backgroundImage: faker.internet.avatar(),

            }
        });
        test("Should throw error if doesn't have userId", async () => {

            await expect(UserProfile.create(newProfile)).rejects.toThrow();
        });

        beforeEach(() => {
            newProfile.userId = faker.datatype.number(100);
        })
        
        test("Should throw a error if userId is not exists in DB", async() => {
         
  
            await expect(new UserProfile(newProfile).validate()).resolves.toBeDefined();
        });

        test("Should throw error if birthday is bigger than date now.", async() => {
            const cloneUserProfile = {...newProfile};
            cloneUserProfile.birthDay = new Date(Date.now() + 1000);
 
            
            await expect(UserProfile.create(cloneUserProfile)).rejects.toThrowError();
        });

        test("Should throw a error if avtImage is not a URL", async() => {

            const cloneUserProfile :IUserProfileAllField = {...newProfile};
            cloneUserProfile.avtImage = "InvalidAvtImage";

            await expect(UserProfile.create(cloneUserProfile)).rejects.toThrow();
        });
        test("Should throw a error if backgroundImage is not a URL", async() => {

            const cloneUserProfile :IUserProfileAllField = {...newProfile};
            cloneUserProfile.backgroundImage = "InvalidBackgroundImage";

            await expect(UserProfile.create(cloneUserProfile)).rejects.toThrow();
        });

        test("Should throw a error if gender doesn't include enum: [female, male, other].", async () => {
            const cloneUserProfile: IUserProfileAllField = { ...newProfile};
            cloneUserProfile.gender = "InValidGender"

            await expect(UserProfile.create(cloneUserProfile)).rejects.toThrow();
        });

        test("Should throw a error if fistName is more than 30 characters.", async () => {
            const cloneUserProfile: IUserProfileAllField = {...newProfile};
            cloneUserProfile.firstName = "x".repeat(31);

            await expect(UserProfile.create(cloneUserProfile)).rejects.toThrow();
        });

        test("Should throw a error if lastName is more than 30 characters.", async () => {
            const cloneUserProfile: IUserProfileAllField = {...newProfile};
            cloneUserProfile.lastName = "x".repeat(31);

            await expect(UserProfile.create(cloneUserProfile)).rejects.toThrow();
        });
        
    })
})