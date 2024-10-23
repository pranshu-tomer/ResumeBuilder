import { Client, Databases, Query } from "appwrite";
import { v4 as uuidv4 } from 'uuid';

const projectId = import.meta.env.VITE_APPWRITE_PROJECTID
const databaseId = import.meta.env.VITE_APPWRITE_DATABASEID
const resumeCollectionId = import.meta.env.VITE_APPWRITE_RESUME_COLLECTIONID

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectId);

const databases = new Databases(client);

const createResume = async ({jobTitle,userId}) => {
    const result = await databases.createDocument(
        `${databaseId}`,
        `${resumeCollectionId}`,
        `${uuidv4()}`,
        {
            jobTitle,
            userId
        }
    )
    console.log(result)
    return result
}

const getResume = async ({resumeId}) => {
    const result = await databases.getDocument(
        `${databaseId}`,
        `${resumeCollectionId}`,
        `${resumeId}`
    );
    return result
}

const updateResume = async ({resumeId,data}) => {
    console.log(data)
    const result = await databases.updateDocument(
        `${databaseId}`,
        `${resumeCollectionId}`,
        `${resumeId}`,
        {...data.data}
    );
    return result
}

const getResumeList = async ({userId}) => {
    const result = await databases.listDocuments(
        `${databaseId}`, 
        `${resumeCollectionId}`, 
        [Query.equal("userId", [userId])]
    );
    return result
}

const deleteResume = async ({resumeId}) => {
    const result = await databases.deleteDocument(
        `${databaseId}`, 
        `${resumeCollectionId}`,
        `${resumeId}`
    );
    return result
}


const GlobalApi = {
    createResume,
    getResume,
    updateResume,
    getResumeList,
    deleteResume
}

export default GlobalApi

