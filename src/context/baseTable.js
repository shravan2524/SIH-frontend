import React, { createContext, useState, useEffect } from "react";
import {
  getCastes,
  getCountries,
  getCourses,
  getDistricts,
  getFigs,
  getReligions,
  getStates,
  getStreams,
} from "../bloc/baseTables";

export const BaseTablesContext = createContext(null);

export function BaseTablesProvider({ children }) {
  const [countries, setCountries] = useState([{ name: "Select Country" }]);
  const [states, setStates] = useState([{ name: "Select Country First" }]);
  const [castes, setCastes] = useState([{ name: "Select Caste" }]);
  const [religions, setReligions] = useState([{ name: "Select Religion" }]);
  const [figs, setFigs] = useState([{ name: "Select Family Income Group" }]);
  const [districts, setDistricts] = useState([{ name: "Select State First" }]);
  const [streams, setStreams] = useState([{ name: "Select Stream" }]);
  const [courses, setCourses] = useState([{ name: "Select Stream first" }]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getCountries().then((val) => setCountries(val));
    getCastes().then((val) => setCastes(val));
    getReligions().then((val) => setReligions(val));
    getFigs().then((val) => setFigs(val));
    getCourses().then((val) => setCourses(val));
    getStreams().then((val) => setStreams(val));
  }, []);
  const handleCountry = (event) => {
    setLoading(true);
    let data = countries.filter((el) => el._id === event.target.value)[0];
    getStates()
      .then((val) => {
        let filteredStates = val.filter((el) => el.country === data._id);
        setStates(filteredStates);
      })
      .finally(setLoading(false));
  };
  const handleStates = (event) => {
    setLoading(true);
    let data = states.filter((el) => el._id === event.target.value)[0];
    getDistricts()
      .then((val) => {
        let filteredDistricts = val.filter((el) => el.state === data._id);
        setDistricts(filteredDistricts);
      })
      .finally(setLoading(false));
  };
  const handleStreams = (event) => {
    setLoading(true);
    let data = streams.filter((el) => el._id === event.target.value)[0];
    getCourses()
      .then((val) => {
        let filteredCourses = val.filter((el) => el.state === data._id);
        setCourses(filteredCourses);
      })
      .finally(setLoading(false));
  };

  return (
    <BaseTablesContext.Provider
      value={{
        countries,
        setCountries,
        isLoading,
        setStates,
        states,
        handleCountry,
        districts,
        handleStates,
        setLoading,
        castes,
        religions,
        figs,
        handleStreams,
        courses,
        streams,
      }}
    >
      {children}
    </BaseTablesContext.Provider>
  );
}
