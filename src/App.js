import { BrowserRouter } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import LaunchPage from "./Components/LaunchPage/Launchpage";
import Events from "./Components/Events/events";
import Display from "./Components/DisplayEvent";
import { eventsConfig } from "./config";
import PieChart from "./Components/PieChart";
import { SliderData } from "./Components/LaunchPage/SliderData";
import { Table } from "react-bootstrap";

function App() {
  const [isEvent, setIsEvent] = useState(false);
  const [displayData, setDisplayData] = useState();
  const [stateSpecificData, setStateSpecificData] = useState();
  const [allStateData, setAllStateData] = useState();
  const stateCode = ["ny", "or", "ca", "wa", "az", "nv", "co", "ut"];

  const parseStateData = (data, state) => {
    let statedata = data.filter((val) => {
      return val._embedded.venues[0].state.stateCode.toLowerCase() === state;
    });
    return statedata;
  };
  const createDisplayDataJoke = (data) => {
    console.log("data from joke call" + data);
    return <div className="Jokedisplay">{data}</div>;
  };
  const createDisplayDataDictionary = (data) => {
    return (
      <>
        <div className="dictionarydisplay">
          <div className="dictionaryWord">{`${data.word}`}</div>
          <div className="dictionaryDefinition">{`Meaning: ${data.definition}`}</div>
          <div className="dictionaryPronunciation">{`Pronunciation:   ${data.pronunciation}`}</div>
        </div>
      </>
    );
  };
  const createDisplayEventsData = (piedata) => {
    // {
    //   "id": "php",
    //   "label": "php",
    //   "value": 95,
    //   "color": "hsl(205, 70%, 50%)"
    // }
    console.log("piedata" + piedata);

    let data = [];
    for (let key in piedata) {
      let keyLabel;
      if (key === "ny") {
        keyLabel = "New York";
      }
      if (key === "or") {
        keyLabel = "Oregon";
      }
      if (key === "ca") {
        keyLabel = "California";
      }
      if (key === "wa") {
        keyLabel = "Washington";
      }
      if (key === "az") {
        keyLabel = "Arizona";
      }
      if (key === "nv") {
        keyLabel = "Nevada";
      }
      if (key === "co") {
        keyLabel = "Colorado";
      }
      let tempObj = {};
      tempObj.id = key;
      tempObj.label = keyLabel;
      tempObj.value = piedata[key].length;

      if (piedata[key].length > 1) {
        tempObj.value = piedata[key].length - 1;
      } else {
        tempObj.value = piedata[key].length;
      }

      tempObj.color = "hsl(205, 70%, 50%)";
      data.push(tempObj);
    }
    const onClickHandler = (pieData, allData) => {
      let piekey = pieData.data.id;
      console.log("all state data", allData);
      let stateData = allData[piekey];
      setStateSpecificData(stateData);
      console.log("this data", piekey, stateData);
    };
    return <PieChart piedata={piedata} fetchStateData={onClickHandler} />;
  };
  const createDisplayDataAdvice = (data) => {
    return (
      <>
        <div className="AdviceDisplay">
          <h1 className="advice">
            <span>{`${data}`}</span>
          </h1>
        </div>
      </>
    );
  };
  const createDisplayDataQuotes = (data) => {
    let RandomNumber = Math.floor(Math.random() * 100);
    return (
      <div className="QuotesDisplay">
        <span>{data[RandomNumber].en} </span>
        <span>{data[RandomNumber].author}</span>
      </div>
    );
  };
  const createDisplayDataGIFs = (data) => {
    console.log("datagifs" + data.url);
    return (
      <>
        <div className="GIFdisplay">
          {console.log("image url:" + data.url)}
          <img
            className="GIFimageDisplay"
            src={data.url}
            alt="GiFs"
            height="20%"
            width="20%"
          />
        </div>
      </>
    );
  };
  const createDisplayDataNews = (data) => {
    return (
      <>
        {data.map((val) => {
          return (
            <>
              <div className="NewsDisplay">
                <img
                  src={val.urlToImage}
                  height="20%"
                  width="20%"
                  alt="NewsImage"
                />
                <div className="Newstitle">{`Title : ${val.title}`}</div>
                <div className="Newsdescription">
                  {" "}
                  {`Description : ${val.description}`}
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };
  const apiResponseHandler = (url, eventName) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsEvent(false);
        if (eventName === "jokes") {
          setDisplayData(createDisplayDataJoke(data.joke));
        } else if (eventName === "dictionary") {
          setDisplayData(createDisplayDataDictionary(data[0]));
        } else if (eventName === "advice") {
          setDisplayData(createDisplayDataAdvice(data.slip.advice));
        } else if (eventName === "quotes") {
          setDisplayData(createDisplayDataQuotes(data.slice(0, 100)));
        } else if (eventName === "news") {
          setDisplayData(createDisplayDataNews(data.articles.slice(0, 5)));
        } else if (eventName === "gifs/memes") {
          setDisplayData(createDisplayDataGIFs(data.memes[0]));
        } else if (eventName === "events") {
          setIsEvent(true);
          let stateObjHolder = {};
          stateCode.forEach((state) => {
            let stateData = parseStateData(data._embedded.events, state);
            stateObjHolder[state] = stateData;
          });
          console.log("details", stateObjHolder);
          setAllStateData(stateObjHolder);

          setDisplayData(createDisplayEventsData(stateObjHolder));
          // let stateData = parseStateData(data._embedded.events);
          // setDisplayData(createDisplayDataEvents(stateData));
        }
        //eventsConfig.forEach((val)=>{
        //     if(val.toLowerCase() === eventName){

        //   }
        //  })
      });
  };

  return (
    <BrowserRouter>
      <LaunchPage slides={SliderData} />
      <div className="navContainer">
        <div className="AllIconsDisplay">
          {eventsConfig.map((data) => {
            return <Events eventData={data} iconClick={apiResponseHandler} />;
          })}
        </div>
      </div>
      <div className="output">
        {displayData && <Display displayContent={displayData} />}
        {isEvent && stateSpecificData && (
          <span className="EventsAndPie">
            <table className="EventsTable">
              <thead>
                <tr>
                  <th>Event</th>

                  <th>Date</th>
                  <th>Site</th>
                </tr>
              </thead>
              {stateSpecificData &&
                stateSpecificData.map((val) => {
                  return (
                    <tbody>
                      <tr>
                        <td>{val.name}</td>

                        <td>{val.dates.start.localDate}</td>
                        <td>
                          <a href={val.url}>Link</a>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </table>
          </span>
        )}
      </div>
    </BrowserRouter>
  );
}
export default App;
