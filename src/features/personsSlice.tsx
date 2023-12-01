import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Person {
  id: number;
  name: string;
  age: number;
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
      state.persons.push(action.payload);
    },
    editPerson: (state, action: PayloadAction<Person>) => {
      const index = state.persons.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.persons[index] = action.payload;
      }
    },
    deletePerson: (state, action: PayloadAction<number>) => {
      state.persons = state.persons.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addPerson, editPerson, deletePerson } = personsSlice.actions;

export default personsSlice.reducer;
