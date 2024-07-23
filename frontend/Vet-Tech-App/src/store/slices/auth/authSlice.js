import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'non-authenticated', //'checking' , 'authenticated', 'non-authenticated'
        uid: null,
        email: null,
        role: null,
        errorMessage: null,
        isSelected: false,
        isOpen: false,
    },
    reducers: {
        login: (state, {payload}) => {
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.email = payload.email;
            state.role = payload.role;
            state.errorMessage = null;
        },
        logout: (state, {payload}) => { 
            state.status = 'non-authenticated';
            state.uid = payload.uid;
            state.email = payload.email;
            state.role = payload.role;
            state.errorMessage = payload?.errorMessage;
        },
        chekingStatus: (state) => {
            state.status = 'checking';
        },
        setSelected: (state) => {
            state.isSelected = !state.isSelected
        },
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
        openChooseRoleModal: (state) => {
            state.isOpen = true;
        },
        closeChooseRoleModal: (state) => {
            state.isOpen = false;
        }


    }
});


export const { 
    login, 
    logout, 
    chekingStatus, 
    setSelected, 
    openModal,
    closeModal,
    openChooseRoleModal,
    closeChooseRoleModal, } = authSlice.actions;