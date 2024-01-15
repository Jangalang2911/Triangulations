import React from "react";
import SearchBar from "./SearchBar";
import Select from "react-select";
import { useState, useEffect } from "react";
import {
    typeFilterKeys,
    languageFilterKeys,
    scriptFilterKeys,
    genreFilterKeys,
    defaultDateValues,
    defaultDimensionValues,
    dimensionFilterKeys
} from "./FilterUtils";
import DoubleSlider from "./DoubleSlider";
import '../ExploreStyles/FilterBar.css';


const FilterBar = (props) => {
    const [typeFilter, setTypeFilter] = useState(null);
    const handleTypeFilterChange = (e) => {
        setTypeFilter(e.target.value);
    };
    const [number1, setNumber1] = useState(null);
    const [number2, setNumber2] = useState(null);
    const handleSubmit = () => {
        setDateFilter([number1, number2]);
    };

    const [languageFilter, setLanguageFilter] = useState(null);
    const handleLanguageFilterChange = (e) => {
        setLanguageFilter(e.target.value);
    };

    const {calendarType, onCalendarTypeChange} = props;
    const handleCalendarTypeChange = (e) => {
        setCalendarType(e.target.value);
        onCalendarTypeChange(e.target.value);
    }

    const [scriptFilter, setScriptFilter] = useState(null);
    const handleScriptFilterChange = (e) => {
        setScriptFilter(e.target.value);
    };

    const [genreFilter, setGenreFilter] = useState([]);
    const handleGenreFilterChange = (e) => {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setGenreFilter(value);
    };

    const [dateFilter, setDateFilter] = useState(defaultDateValues);
    const handleDateFilterChange = (bounds) => {
        console.log(bounds);
        setDateFilter(bounds);
    };

    const [dimensionFilter, setDimensionFilter] = useState(null);
    const handleDimensionFilterChange = (e) => {
        setDimensionFilter(e.target.value);
    }

    // const [dimensionFilter, setDimensionFilter] = useState(
    //     defaultDimensionValues
    // );
    // const handleDimensionFilterChange = (bounds) => {
    //     console.log(bounds);
    //     setDimensionFilter(bounds);
    // };

    // Handles the lag in asynchronous function setState()
    useEffect(() => {
        props.filterByType(typeFilter);
        props.filterByLanguage(languageFilter);
        props.filterByScript(scriptFilter);
        props.filterByGenre(genreFilter);
        props.filterByDate(dateFilter);
        props.filterByDimension(dimensionFilter);
    });
    return (
        <div className='grid'>
            <div className="searchbar">
                <SearchBar onChange={props.searchChange} />
            </div>
            <div className='headings'>
                <small>Type:</small>
                <select id='type' required onChange={handleTypeFilterChange}>
                    <option value={null} selected>
                        All
                    </option>
                    {typeFilterKeys.map((key) => {
                        return <option value={key}>{key}</option>;
                    })}
                </select>
            </div>
            <div className='headings'>
                <small>Language:</small>
                <select
                    id='language'
                    required
                    onChange={handleLanguageFilterChange}
                >
                    <option value={null} selected>
                        All
                    </option>
                    {languageFilterKeys.map((key) => {
                        return <option value={key}>{key}</option>;
                    })}
                </select>
            </div>
            <div className='headings'>
                <small>Script:</small>
                <select
                    id='script'
                    required
                    onChange={handleScriptFilterChange}
                >
                    <option value={null} selected>
                        All
                    </option>
                    {scriptFilterKeys.map((key) => {
                        return <option value={key}>{key}</option>;
                    })}
                </select>
            </div>
            <div className='headings'>
                <small>Genre:</small>
                <select
                    id='genre'
                    required
                    onChange={handleGenreFilterChange}
                    multiple='multiple'
                >
                    <option value={null} selected>
                        All
                    </option>
                    {genreFilterKeys.map((key) => {
                        return <option value={key}>{key}</option>;
                    })}
                </select>
                {/* <details role='list'>
                    <summary aria-haspopup='listbox'>select...</summary>
                    <ul role='listbox'>
                        {genreFilterKeys.map((key) => {
                            return (
                                <li>
                                    {" "}
                                    <label>
                                        {" "}
                                        <input
                                            type='checkbox'
                                            value={key}
                                        />{" "}
                                        {key}{" "}
                                    </label>{" "}
                                </li>
                            );
                        })}
                    </ul>
                </details> */}
            </div>
            {/* <div className='headings'>
                <small>Date:</small>
                <div><small id="date">{defaultDateValues[0].toString() + ' AH' + ' - ' + defaultDateValues[1].toString() + ' AH'}</small></div>
                <DoubleSlider
                    min={defaultDateValues[0]}
                    max={defaultDateValues[1]}
                    step={1}
                    defaultValue={defaultDateValues}
                    onChange={(bounds) => {handleDateFilterChange(bounds); 
                        document.getElementById('date').innerText = bounds[0].toString() + ' AH' + ' - ' + bounds[1].toString() + ' AH';}
                    }
                />
            </div> */}
            <div className='headings'>
                <legend>Calendar:</legend>
                <div>
                    <input
                        type="radio"
                        id="hijri"
                        checked={calendarType === "hijri"}
                        name="calendar"
                        value="hijri"
                        onChange={handleCalendarTypeChange}
                    />
                    <label htmlFor="hijri">Hijri</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="gregorian"
                        checked={calendarType === "gregorian"}
                        name="calendar"
                        value="gregorian"
                        onChange={handleCalendarTypeChange}
                    />
                    <label htmlFor="gregorian">Gregorian</label>
                </div>
            </div>
            <form className="headings" onSubmit={handleSubmit}>
                <p>Start:</p>
               <input type="number" value={number1} required onChange={(e) => setNumber1(parseInt(e.target.value))}></input>
               <p>End:</p>
               <input type="number" value={number2} required onChange={(e) => setNumber2(parseInt(e.target.value))}></input>
               <input type="submit" value="Apply" className="submit"></input>
                </form>
            <div className='headings'>
            <small>Dimension:</small>
                <select id='type' required onChange={handleDimensionFilterChange}>
                    <option value={null} selected>
                        All
                    </option>
                    {dimensionFilterKeys.map((key) => {
                        return <option value={key}>{key}</option>;
                    })}
                </select>
            </div>
        </div>
    );
};

export default FilterBar;
