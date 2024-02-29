import React, { useState, useRef } from "react";
import Select from "react-select";
import "./App.css";

const filterOptions = [
  { id: "brightness", name: "Brightness" },
  { id: "saturation", name: "Saturation" },
  { id: "inversion", name: "Inversion" },
  { id: "grayscale", name: "Grayscale" },
];

// Add basic Instagram filter options
const instagramFilters = [
  { id: "black", name: "Black and White" },
  { id: "clarendon", name: "Clarendon" },
  { id: "gingham", name: "Gingham" },
  { id: "juno", name: "Juno" },
  { id: "lark", name: "Lark" },
  { id: "mayfair", name: "Mayfair" },
  { id: "moon", name: "Moon" },
  { id: "retro", name: "Retro" },
  { id: "sierra", name: "Sierra" },
  { id: "valencia", name: "Valencia" },
  { id: "vintage", name: "Vintage" },
  { id: "walden", name: "Walden" },
];

function App() {
  const [instagramFilterValue, setInstagramFilterValue] = useState(null);
  const [shouldApplyFilter, setShouldApplyFilter] = useState(true);
  const [activeTab, setActiveTab] = useState("filters");
  const [previewImg, setPreviewImg] = useState(null);
  const [activeFilter, setActiveFilter] = useState("brightness");
  const [sliderValue, setSliderValue] = useState(100);
  const [brightness, setBrightness] = useState("100");
  const [saturation, setSaturation] = useState("100");
  const [inversion, setInversion] = useState("0");
  const [grayscale, setGrayscale] = useState("0");
  const [rotate, setRotate] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(1);
  const [flipVertical, setFlipVertical] = useState(1);
  const fileInputRef = useRef(null);
  const previewImgRef = useRef(null);

  const loadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewImg(file);
    resetFilter();
  };

  const applyFilter = () => {
    console.log("apply filter");
    if (shouldApplyFilter) {
      previewImgRef.current.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
      previewImgRef.current.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    }
  };

  const resetFilter = () => {
    setShouldApplyFilter(true);
    setBrightness("100");
    setSaturation("100");
    setInversion("0");
    setGrayscale("0");
    setRotate(0);
    setFlipHorizontal(1);
    setFlipVertical(1);
    setActiveFilter("brightness");
    setSliderValue(100);
  };

  const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.onload = () => {
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      console.log(instagramFilterValue);

      if (shouldApplyFilter) {
        ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
      } else {
        ctx.filter = instagramFilterValue;
      }

      ctx.translate(canvas.width / 2, canvas.height / 2);
      if (rotate !== 0) {
        ctx.rotate((rotate * Math.PI) / 180);
      }
      ctx.scale(flipHorizontal, flipVertical);
      ctx.drawImage(
        image,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
      );

      const link = document.createElement("a");
      link.download = "image.jpg";
      link.href = canvas.toDataURL();
      link.click();
    };

    image.src = URL.createObjectURL(previewImg);
  };

  const handleFilterClick = (option) => {
    setActiveFilter(option.id);
    setShouldApplyFilter(true);
    switch (option.id) {
      case "brightness":
        setSliderValue(brightness);
        break;
      case "saturation":
        setSliderValue(saturation);
        break;
      case "inversion":
        setSliderValue(inversion);
        break;
      default:
        setSliderValue(grayscale);
    }
  };

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
    setShouldApplyFilter(true);
    switch (activeFilter) {
      case "brightness":
        setBrightness(event.target.value);
        break;
      case "saturation":
        setSaturation(event.target.value);
        break;
      case "inversion":
        setInversion(event.target.value);
        break;
      default:
        setGrayscale(event.target.value);
    }
  };

  const handleRotate = (option) => {
    setShouldApplyFilter(true);
    if (option === "left") {
      setRotate(rotate - 90);
    } else if (option === "right") {
      setRotate(rotate + 90);
    } else if (option === "horizontal") {
      setFlipHorizontal(flipHorizontal === 1 ? -1 : 1);
    } else {
      setFlipVertical(flipVertical === 1 ? -1 : 1);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    resetFilter(); // Reset filters when switching tabs
  };

  const handleInstagramFilterChange = (selectedOption) => {
    setActiveFilter(selectedOption.value);
    setShouldApplyFilter(false);
    console.log(selectedOption.value);
    switch (selectedOption.value) {
      case "black":
        applyBlackAndWhiteFilter();
        break;
      case "clarendon":
        applyClarendonFilter();
        break;
      case "gingham":
        applyGinghamFilter();
        break;
      case "moon":
        applyMoonFilter();
        break;
      case "vintage":
        applyVintageFilter();
        break;
      case "valencia":
        applyValenciaFilter();
        break;
      case "walden":
        applyWaldenFilter();
        break;
      case "juno":
        applyJunoFilter();
        break;
      case "lark":
        applyLarkFilter();
        break;
      case "mayfair":
        applyMayfairFilter();
        break;
      case "sierra":
        applySierraFilter();
        break;
      case "retro": // Apply Retro filter
        applyRetroFilter();
        break;
      default:
      // Default case
    }
  };

  const applyClarendonFilter = () => {
    console.log("clarendon");
    if (previewImgRef.current) {
      setInstagramFilterValue(`contrast(1.2) brightness(1.2) saturate(1.2) hue-rotate(330deg)`);
      previewImgRef.current.style.filter = `contrast(1.2) brightness(1.2) saturate(1.2) hue-rotate(330deg)`;
    }
  };

  const applyGinghamFilter = () => {
    console.log("gingham");
    if (previewImgRef.current) {
      setInstagramFilterValue(`contrast(1.1) brightness(1.1) saturate(0.8) sepia(0.2)`);
      previewImgRef.current.style.filter = `contrast(1.1) brightness(1.1) saturate(0.8) sepia(0.2)`;
    }

  };

  const applyMoonFilter = () => {
    console.log("moon");
    if (previewImgRef.current) {
      setInstagramFilterValue(`grayscale(1) contrast(1.2) brightness(1.1)`);
      previewImgRef.current.style.filter = `grayscale(1) contrast(1.2) brightness(1.1)`;
    }
  };

  const applyVintageFilter = () => {
    console.log("vintage");
    if (previewImgRef.current) {
      setInstagramFilterValue(`sepia(0.3) saturate(1.2) contrast(0.8) brightness(0.9)`);
      previewImgRef.current.style.filter = `sepia(0.3) saturate(1.2) contrast(0.8) brightness(0.9)`;
    }
  };

  const applyBlackAndWhiteFilter = () => {
    console.log("black and white");
    if (previewImgRef.current) {
      setInstagramFilterValue(`grayscale(1)`);
      previewImgRef.current.style.filter = `grayscale(1)`;
    }
  };

  const applyValenciaFilter = () => {
    console.log("valencia");
    if (previewImgRef.current) {
      setInstagramFilterValue(`sepia(0.2) contrast(1.2) brightness(1.1) hue-rotate(-30deg)`);
      previewImgRef.current.style.filter = `sepia(0.2) contrast(1.2) brightness(1.1) hue-rotate(-30deg)`;
    }
  };

  const applyWaldenFilter = () => {
    console.log("walden");
    if (previewImgRef.current) {
      setInstagramFilterValue(`sepia(0.2) contrast(0.8) brightness(1.1) saturate(1.5)`);
      previewImgRef.current.style.filter = `sepia(0.2) contrast(0.8) brightness(1.1) saturate(1.5)`;
    }
  };

  const applyJunoFilter = () => {
    console.log("juno");
    if (previewImgRef.current) {
      setInstagramFilterValue(`sepia(0.4) contrast(1.3) brightness(1.2) saturate(1.5) hue-rotate(-20deg)`);
      previewImgRef.current.style.filter = `sepia(0.4) contrast(1.3) brightness(1.2) saturate(1.5) hue-rotate(-20deg)`;
    }
  };

  const applyLarkFilter = () => {
    console.log("lark");
    if (previewImgRef.current) {
      setInstagramFilterValue(`sepia(0.2) contrast(1.5) brightness(1.2) saturate(1.5) hue-rotate(10deg)`);
      previewImgRef.current.style.filter = `sepia(0.2) contrast(1.5) brightness(1.2) saturate(1.5) hue-rotate(10deg)`;
    }
  };

  const applyMayfairFilter = () => {
    console.log("mayfair");
    if (previewImgRef.current) {
      setInstagramFilterValue(`sepia(0.2) contrast(1.1) brightness(1.2) saturate(1.3) hue-rotate(-10deg)`);
      previewImgRef.current.style.filter = `sepia(0.2) contrast(1.1) brightness(1.2) saturate(1.3) hue-rotate(-10deg)`;
    }
  };

  const applySierraFilter = () => {
    console.log("sierra");
    if (previewImgRef.current) {
      setInstagramFilterValue(`sepia(0.3) contrast(0.8) brightness(1.1) saturate(1.5) hue-rotate(-10deg)`);
      previewImgRef.current.style.filter = `sepia(0.3) contrast(0.8) brightness(1.1) saturate(1.5) hue-rotate(-10deg)`;
    }
  };

  const applyRetroFilter = () => {
    console.log("retro");
    if (previewImgRef.current) {
      setInstagramFilterValue(`sepia(0.3) contrast(0.8) brightness(1.2) saturate(1.5) hue-rotate(-30deg)`);
      previewImgRef.current.style.filter = `sepia(0.3) contrast(0.8) brightness(1.2) saturate(1.5) hue-rotate(-30deg)`;
    }
  };

  const customFilterStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted #aaa',
      color: state.isSelected ? '#000' : '#555',
      padding: 8,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 200,
      display: 'flex',
      borderRadius: '10px',
      border: '1px solid #ccc',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    }),
  };

  const options = instagramFilters.map((filter) => ({
    value: filter.id,
    label: (
      <div>
        {filter.name}
        <div className={`filter-preview ${filter.id}`} />
      </div>
    ),
  }));

  return (
    <div className="app">
      {/* Add Logo Here */}
      <img src="/image/logo.png" alt="logo" className="logo" />
      <div className={`container ${!previewImg ? "disable" : ""}`}>
        <h2>Image Editor</h2>
        <div className="tabs">
          <button
            className={`tab ${activeTab === "filters" ? "active" : ""}`}
            onClick={() => handleTabClick("filters")}
          >
            Basic
          </button>
          <button
            className={`tab ${activeTab === "adjustments" ? "active" : ""}`}
            onClick={() => handleTabClick("adjustments")}
          >
            Advanced
          </button>
        </div>
        <div className="wrapper">
          <div className="editor-panel">
            {activeTab === "filters" && (
              <div className="filter">
                <label className="title">Adjustments</label>
                <div className="options">
                  {filterOptions.map((option) => (
                    <button
                      key={option.id}
                      id={option.id}
                      className={activeFilter === option.id ? "active" : ""}
                      onClick={() => handleFilterClick(option)}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
                <div className="slider">
                  <div className="filter-info">
                    <p className="name">{activeFilter}</p>
                    <p className="value">{`${sliderValue}%`}</p>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={
                      activeFilter === "brightness" || activeFilter === "saturation"
                        ? "200"
                        : "100"
                    }
                    value={sliderValue}
                    onChange={handleSliderChange}
                  />
                </div>
                <div className="rotate">
                  <label className="title">Rotate & Flip</label>
                  <div className="options">
                    <button id="left" onClick={() => handleRotate("left")}>
                      <i className="fa-solid fa-rotate-left"></i>
                    </button>
                    <button id="right" onClick={() => handleRotate("right")}>
                      <i className="fa-solid fa-rotate-right"></i>s
                    </button>
                    <button
                      id="horizontal"
                      onClick={() => handleRotate("horizontal")}
                    >
                      <i className="bx bx-reflect-vertical"></i>
                    </button>
                    <button id="vertical" onClick={() => handleRotate("vertical")}>
                      <i className="bx bx-reflect-horizontal"></i>
                    </button>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "adjustments" && (
              <div className="adjustments">
                <label className="title">Filters</label>
                <div className="options">
                  <Select
                    options={options}
                    styles={customFilterStyles}
                    onChange={handleInstagramFilterChange}
                    value={options.find((opt) => opt.value === activeFilter)}
                  />
                </div>
                <div className="slider">
                  {/* Add adjustment sliders and controls here */}
                </div>
              </div>
            )}
          </div>
          <div className="preview-img">
            {previewImg ? (
              <img
                src={URL.createObjectURL(previewImg)}
                alt="preview"
                ref={previewImgRef}
                onLoad={applyFilter}
              />
            ) : (
              <img src="image-placeholder.svg" alt="preview-img" />
            )}
          </div>
        </div>
        <div className="controls">
          <button className="reset-filter" onClick={resetFilter}>
            Reset Filters
          </button>
          <div className="row">
            <input
              type="file"
              className="file-input"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={loadImage}
            />
            <button
              className="choose-img"
              onClick={() => fileInputRef.current.click()}
            >
              Choose Image
            </button>
            <button onClick={saveImage} className="save-img">
              Save Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
