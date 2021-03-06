import axios from 'axios'
import React, { createContext, useContext, useReducer } from 'react'

export const defaultState = {
    individu: [],
    kk: [],
    selectedDataIndividu: {},
    isEditMode: false,
    selectedUser: {},
    isEditUserMode: false,
    users: [],
    roles: [],
    selectedRole: {},
    notes: [],
}

export const Action = {
    Set: 'Set',
    Fetch: 'Fetch',
    Remove: 'Remove',
    RemoveUser: 'RemoveUser',
    AddUser: 'AddUser',
    AddNote: 'AddNote',
    RemoveRole: 'RemoveRole',
    Clean: 'Clean',
}

export const DataReducer = (state, action) => {
    switch (action.type) {
        case Action.Set:
            return {
                ...state,
                [action.payload.key]: action.payload.data
            }
        case Action.Fetch:  
            return {
                ...state,
                individu: action.payload.individu,
                kk: action.payload.kk
            }
        case Action.AddUser:
            return {
                ...state,
                users: [...state.users, action.payload.user]
            }
        case Action.RemoveUser:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload.id)
            }
        case Action.AddNote: 
            return {
                ...state,
                notes: [...state.notes, action.payload.note]
            }
        case Action.RemoveRole:
            return {
                ...state,
                roles: state.roles.filter(role => role.id !== action.payload.id)
            }
        case Action.RemoveNote:
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.payload.id)
            }
        case Action.Clean:
            return {
                ...state,
                ...defaultState
            }   
        default:
            return state
    }
}

const context = createContext();
const setDataIndividu = (dispatch) => {
    return (data) => {
        dispatch({ type: Action.Set, payload: { key: 'individu', data } })
    }
}

const setDataKk = (dispatch) => {
    return (data) => {
        dispatch({ type: Action.Set, payload: { key: 'kk', data } })
    }
}

const setUsers = (dispatch) => {
    return (data) => {
        dispatch({ type: Action.Set, payload: { key: 'users', data } })
    }
}

const setRoles = (dispatch) => {
    return (data) => {
        dispatch({ type: Action.Set, payload: { key: 'roles', data } })
    }
}

const selectRole = (dispatch) => {
    return (data) => {
        dispatch({ type: Action.Set, payload: { key: 'selectedRole', data } })
    }
}

const removeRole = (dispatch) => {
    return (id) => {
        dispatch({ type: Action.RemoveRole, payload: { id: id } })
    }
}

const removeUser = (dispatch) => {
    return (id) => {
        dispatch({ type: Action.RemoveUser, payload: { id: id } })
    }
}

const addUser = (dispatch) => {
    return (data) => {
        dispatch({ type: Action.AddUser, payload: { user: data } })
    }
}

const setEditUserMode = (dispatch) => {
    return (data) => {
        dispatch({
             type: Action.Set, 
             payload: { key: 'isEditUserMode', data } 
        })
    }   
}
const setEditMode = (dispatch) => {
    return (data) => {
        dispatch({
             type: Action.Set, 
             payload: { key: 'isEditMode', data } 
        })
    }
}

const selectDataIndividu = (dispatch) => {
    return (data) => {
        dispatch({ type: Action.Set, payload: { key: 'selectedDataIndividu', data } })
    }
}

const selectDataKk = (dispatch) => {
    return (data) => {
        dispatch({ type: Action.Set, payload: { key: 'selectedDataKk', data } })
    }
}

const selectUser = (dispatch) => {
    return (data) => {
        dispatch({ type: Action.Set, payload: { key: 'selectedUser', data } })
    }
}

const cleanState = (dispatch) => {
    return () => {
        dispatch({ type: Action.Clean })
    }
}

const setNotes = (dispatch) => {
    return (data) => {
        dispatch({ type: Action.Set, payload: { key: 'notes', data } })
    }
}

const setAddNoteMode = (dispatch) => {
    return (data) => {
        dispatch({ type: Action.Set, payload: { key: 'isAddNoteMode', data } })
    }
}

const addNote = (dispatch) => {
    return (data) => {
        dispatch({ type: Action.AddNote, payload: { note: data } })
    }
}

const removeNote = (dispatch) => {
    return (id) => {
        dispatch({ type: Action.RemoveNote, payload: { id: id } })
    }
}
export const useData = () => useContext(context)

export const DataProvider = ({ children, initialState, reducer }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = {
        state,
        setDataIndividu: setDataIndividu(dispatch),
        setDataKk: setDataKk(dispatch),
        setEditMode: setEditMode(dispatch),
        selectDataIndividu: selectDataIndividu(dispatch),
        selectDataKk: selectDataKk(dispatch),
        setUsers: setUsers(dispatch),
        selectUser: selectUser(dispatch),
        removeUser: removeUser(dispatch),
        setEditUserMode: setEditUserMode(dispatch),
        setRoles: setRoles(dispatch),
        selectRole: selectRole(dispatch),
        setNotes: setNotes(dispatch),
        cleanState: cleanState(dispatch),
        setAddNoteMode: setAddNoteMode(dispatch),
        removeNote: removeNote(dispatch),
        addNote: addNote(dispatch),
        addUser: addUser(dispatch),
        removeRole: removeRole(dispatch),
    }
    return <context.Provider value={value}>{children}</context.Provider>
}
