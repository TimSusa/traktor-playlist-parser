import CustomHead from '../components/MetaHead'
import { useState } from "react";
import { Parser } from 'm3u8-Parser'

var parser = new Parser();
parser.addParser({
  expression: /^#VOD-FRAMERATE/,
  customType: 'framerate',
  dataParser: function (line) {
    return parseFloat(line.split(':')[1]);
  }
});

export default function Home() {
  const [playlistText, setPlaylistText] = useState('')

  return (
    <div className="container">
      <CustomHead>
        <title>Rekordbox Playlist Parser</title>
        <link rel="icon" href="/favicon.ico" />
      </CustomHead>

      <main>
        <a href="https://www.timsusa.net">
          <h1>Rekordbox Playlist Parser</h1>
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


              text = test_text.split("\n");
              parser.push(text);
              parser.end();
              parsedText = parser.manifest;
              const manifest = [
                '#EXTM3U',
                '#EXT-X-VERSION:3',
                '#VOD-FRAMERATE:29.97',
                ''
              ].join('\n');
              parser.push(manifest.concat(text.join('\n')));
              parser.end();
              parser.manifest // 29.97
              console.log(parsedText)
              setPlaylistText(parsedText.segments);
            };

            reader.readAsText(event.dataTransfer.files[0]);


          }}
          onDragOver={(e) => {
            let event = e;
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          {playlistText ? playlistText.map(({ uri, duration }) => {
            let filename = uri.substring(uri.lastIndexOf('/') + 1);
            return (<><div>{`${filename} - ${(duration / 60).toString().substr(0, 4)}min`}</div><div>{ }</div></>)
          }

          ) : (
            <div>
              <h3>Easily Drop *.m3u8 File from Rekordbox History to this area:</h3>
              <br></br>
              <p>
                <b>Mac OSX: </b>/Volumes/mydevice/pioneer../*/History/*
                <br></br>
                or
                <br></br>
                <b> Win:</b> where your stuff is /lol

              </p>
            </div>
          )}


        </div>


      </main >
      <footer>
        <a href="https://linktr.ee/timsusa" rel="noreferrer" target="_blank">
          LinkTree
        </a>
      </footer>
      <style jsx>{`
        .container {
          width: 100%;
          padding: 16px;
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
            rgba(223, 93, 22, 0.4) 100%,
            rgba(2, 0, 36, 0.5) 0%,
            rgba(0, 212, 255, 0.1805497198879552) 0%
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
            background: radial-gradient(circle,rgba(223,43,14,.7)0%,rgba(2,0,16,.5)0%,rgb(0 0 0 / 18%)100%);
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
            background: radial-gradient(circle,rgba(223,43,14,.7)0%,rgba(2,0,16,.5)0%,rgb(0 0 0 / 18%)100%);
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 16px;
          margin: 0;
          width: 100%;
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


        }
        @keyframes AnimateBG { 
          0%{background-position:0% 50%}
          50%{background-position:100% 50%}
          100%{background-position:0% 50%}
        }
      `}</style>
    </div >
  );
}

