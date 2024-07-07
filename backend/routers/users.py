from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from db.models.user import User
from db.client import db_client
from db.schemas.user import user_schema, users_schema
from bson import ObjectId
from utils.user_helpers import search_usr

router = APIRouter(prefix="/user_db", 
                   tags=["User DB"],
                   responses={status.HTTP_404_NOT_FOUND: {"messaje" : "No encontrado"}})

class MessageResponse(BaseModel):
    message: str

@router.get("/all", response_model=list[User])
async def getAllUsers():

    return users_schema(db_client.users.find())

@router.get("/by-id/{id}")
async def getUserById(id: str):
    return search_usr("_id", ObjectId(id))
    
@router.get("/by-id")
async def getUserByQuery(id: str):
    return search_usr("_id", ObjectId(id))

@router.post("/new", response_model=User, status_code=status.HTTP_201_CREATED)
async def newUser(user: User):

    if type(search_usr("email", user.email)) == User:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="El usuario ya existe"
        )

    user_dict = dict(user)

    del user_dict['id']

    user_id = db_client.users.insert_one(user_dict).inserted_id

    new_user = user_schema(db_client.users.find_one({"_id": user_id}))
    
    return User(**new_user)

@router.delete("/delete/{id}", status_code=status.HTTP_200_OK)
async def deleteUser(id: str):
    try:
        found = db_client.users.find_one_and_delete({"_id": ObjectId(id)})
        
        if not found:
            return {"error": "El usuario no existe."}
        
        return {"message": "Usuario eliminado exitosamente."}
            
    except Exception as error:
        return {"error": str(error)}

@router.put("/update", response_model=User)
async def editUser(user: User):
    try:
        # Asegúrate de usar el operador $set para actualizar los campos especificados
        updated_user = db_client.users.find_one_and_update(
            {"_id": ObjectId(user.id)},
            {
                "$set": {
                    "username": user.username,
                    "email": user.email,
                    "active": user.active
                }
            },
            return_document=True  # Para devolver el documento actualizado
        )

        # Verifica si se encontró y actualizó el usuario
        if not updated_user:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")

        # Utiliza user_schema para convertir el documento actualizado a un dict
        return User(**user_schema(updated_user))
    except Exception as error:
        return {"error": error}
    