import renderer from 'react-test-renderer';
import {ProjectDetailsDisplay} from "./ProjectDetailsDisplay";
import { Provider } from 'react-redux';
import store from '../redux/store';
import {render, fireEvent, screen} from '@testing-library/react'


test('Initial Test', () => {
    const projectTest =     {
      "Id": 1,
      "Name": "React/Redux with Spotify",
      "Description": "Framework Exploration with Spotify API",
      "Role": "Web Design, Development and Deployment",
      "Tech": "\u003Cul\u003E\u003Cli\u003EAmazon Web Services\u003C/li\u003E\u003Cli\u003EReact JS\u003C/li\u003E\u003Cli\u003ERedux\u003C/li\u003E\u003Cli\u003EWebpack\u003C/li\u003E\u003Cli\u003EHTML 5\u003C/li\u003E\u003Cli\u003EResponsive CSS\u003C/li\u003E\u003C/ul\u003E",
      "Image": "reactredux_spotify.jpg",
      "Url": [
        {
          "Link": "http://reactredux.deluxeluxury.com/",
          "Text": "View Live Sites"
        },
        {
          "Link": "https://github.com/SuperFastCola/tt-music-search/tree/master/app",
          "Text": "View Essential Code"
        },
        {
          "Link": "https://github.com/SuperFastCola/tt-music-search/blob/master/app/sass/styles.scss",
          "Text": "View Essential SASS"
        }
      ],
      "Projid": "reactredux",
      "Type": [
        "design",
        "front-end"
      ]
    };

    const output = render( <Provider store={store}><ProjectDetailsDisplay details={projectTest} />
      </Provider>)

    console.log(output.container);

    expect(screen.getByText(/edit/i)).toBeDefined();
});
