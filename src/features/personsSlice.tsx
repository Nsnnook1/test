import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Person {
  key: number;
  title: string;
  name: string;
  lastname: string;
  birthdate: string;
  national: string;
  idCard?: string[];
  gender: number;
  mobilePrefix: number;
  mobileNumber: number;
  passport?: string;
  expectedSalary: number;
}

interface PersonsState {
  persons: Person[];
}

const initialState: PersonsState = {
  persons: [],
};

export const personsSlice = createSlice({
  name: "persons",
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<Person>) => {
      // state.persons.push(action.payload);
      return {
        ...state,
        persons: [...state.persons, action.payload],
      };
    },
    editPerson: (state, action: PayloadAction<Person>) => {
      const index = state.persons.findIndex(
        (p: any) => p.key === action.payload.key
      );
      if (index !== -1) {
        state.persons[index] = action.payload;
      }
    },
    deletePerson: (state, action: PayloadAction<number>) => {
      state.persons = state.persons.filter(
        (p: any) => p.key !== action.payload
      );
    },
  },
});

export const { addPerson, editPerson, deletePerson } = personsSlice.actions;

export const getPersons = (state: any) => state.persons.persons;

export default personsSlice.reducer;
