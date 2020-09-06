import React, { useState, useEffect } from 'react';
import skull from './skull.png';
import './App.css';
import axios from 'axios';
import { Table, Form, ButtonGroup, ToggleButton } from 'react-bootstrap';


const pvp = [
  { name: 'Yes', value: 'true' },
  { name: 'No', value: 'false' },
  { name: 'Both', value: '' },
];

function App() {
  const [worldData, setWorldData] = useState([]);
  const [isPvp, setIsPvp] = useState('');
  const [isMembers, setIsMembers] = useState('');
  const [resultCount, setResultCount] = useState(0);

  useEffect(() => {
    let url = new URL("http://127.0.0.1:5000/worlds/filter");

    if (isPvp !== '') {
      url.searchParams.append("pvp", isPvp.toString());
    }

    if (isMembers !== '') {
      url.searchParams.append("member", isMembers.toString());
    }

    axios.get(url.toString())
      .then(function(response) {
        setWorldData(response.data);
        setResultCount(response.data.count);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, [isPvp, isMembers]);

  return (
    <div className="container">
      <h1>WorldGuardian</h1>
      <p>Sample frontend application to query the WorldGuardian backend service.</p>
      <div className="world-filter-config">
        <Form>
          <Form.Group controlId="pvp">
            <Form.Label>PvP enabled</Form.Label>
            <Form.Group controlId="filter">
            <ButtonGroup toggle>
              {pvp.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  type="radio"
                  variant="primary"
                  name="radio"
                  value={radio.value}
                  checked={isPvp === radio.value}
                  onChange={(e) => setIsPvp(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
            </Form.Group>
          </Form.Group>

          <Form.Group controlId="type">
            <Form.Label>Members only</Form.Label>
            <Form.Group controlId="filter">
            <ButtonGroup toggle>
              {pvp.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  type="radio"
                  variant="primary"
                  name="radio"
                  value={radio.value}
                  checked={isMembers === radio.value}
                  onChange={(e) => setIsMembers(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
            </Form.Group>
          </Form.Group>
        </Form>
      </div>
      <p>Result count: {resultCount}</p>
      <div className="world-table">
        <Table striped borderless hover responsive="xl">
          <thead>
            <tr>
              <td className="world-number-th">#</td>
              <td className="online-players-th">Online</td>
              <td className="country-th">Country</td>
              <td className="type-th">Type</td>
              <td className="activity-th">Activity</td>
              <td className="is-pvp-th">is PvP</td>
            </tr>
          </thead>
          <tbody>
            {worldData && worldData.worlds && worldData.worlds.map((item) => (<tr><td>{item.number}</td><td>{item.player_count}</td><td>{item.country}</td><td>{item.type}</td><td>{item.activity}</td><td className="is-pvp-tr">{item.pvp ? <img src={skull} alt='pvp world' /> : ''}</td></tr>))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default App;
