import Head from "next/head";
import { useState } from "react";
import { parseXml } from './comp/parseXml'

export default function Home() {
  const [playlistText, setPlaylistText] = useState('')
  return (
    <div className="container">
      <Head>
        <title>Traktor Playlist Parser</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <a href="https://www.timsusa.net">
          <h1>Traktor Playlist Parser</h1>
        </a>
        <br></br>
        <div
          className="dropzone"
          onDrop={(event) => {
            let parsedText = '';
            let text = ''
            event.preventDefault();
            var reader = new FileReader();

            reader.onload = function (event) {
              var test_text = event.target.result;

              if (test_text.indexOf("<?xml") == 0 && test_text.indexOf("<NML") > 0) {
                text = test_text;
                parsedText = parseXml(text, "");
                setPlaylistText(parsedText);
              } else {
                alert("The file you dropped does not look like an NML file.");
              }
            };

            reader.readAsText(event.dataTransfer.files[0]);


          }}
          onDragOver={(e) => {
            let event = e;
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          {playlistText ? (
            <pre>{playlistText}</pre>
          ) : (
            <div>
              <h3>Easily Drop *.nml File from Traktor to this area:</h3>
              <br></br>
              <p>
                <b>Mac OSX: </b>Documents/Native Instruments/Traktor-*/History/*
                <br></br>
                or
                <br></br>
                <b> Win:</b> Documents and Settings/BulletWithButterflyWings/lol

              </p>
            </div>
          )}


        </div>


      </main>
      <footer>
        <a href="https://linktr.ee/timsusa" rel="noreferrer" target="_blank">
          LinkTree
        </a>
      </footer>
      <style jsx>{`
        .container {
          width: 100%;
        }
        
        a {
          color: inherit;
          text-decoration: none;
        }
        .card:hover,
        .card:hover {
          transition: color 0.35s ease;
          color: #000000e5;
          opacity: 1;
          cursor: pointer;
          background: radial-gradient(
            circle,
            rgba(223, 93, 12, 0.7) 100%,
            rgba(2, 0, 36, 0.5) 0%,
            rgba(0, 212, 255, 0.2805497198879552) 0%
          );
        }
        h1, h3, p {
          text-align: center;
        }

        .dropzone {
          height: 70vw;
          border-radius: 10px;
          transition: color 0.15s ease;
            border: #999 5px dashed;
            padding: 16px;
            font-size: 18px;
            vertical-align: middle;
            text-align: center;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #fff4d1e7
            text-decoration: none;
            background: radial-gradient(circle,rgba(223,93,12,.7)0%,rgba(2,0,36,.5)0%,rgb(0 0 0 / 28%)100%);
        }

          .card {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #fff4d1e7
            text-decoration: none;
            border-radius: 10px;
            width: 100%;
            max-width: 1000px;
            transition: background 0.35s ease;
            background: radial-gradient(circle,rgba(223,93,12,.7)0%,rgba(2,0,36,.5)0%,rgb(0 0 0 / 28%)100%);
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 16px;
          margin: 0;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-size: 300% 300%;
          background-image: linear-gradient(
                -45deg, 
                rgba(59,173,227,1) 0%, 
                rgba(87,111,230,1) 25%, 
                rgba(152,68,183,1) 51%, 
                rgba(255,53,127,1) 100%
          );  
          animation: AnimateBG 20s ease infinite;

          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;

            @keyframes AnimateBG { 
              0%{background-position:0% 50%}
              50%{background-position:100% 50%}
              100%{background-position:0% 50%}
            }
        }
      `}</style>
    </div>
  );
}

