import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';

import {createServer, Model} from 'miragejs';

createServer({

  models: {
    order: Model,
  },

  seeds(server) {
    server.db.loadData({
      orders: [
        {
          id: 1,
          name: 'João da Silva',
          unimedProtocol: '7888885',
          unimedWallet: '080008898',
          typeOfHospitalization: 'Clínica',
          sex: 'M',
          sector: 'internado',
          createdAt: new Date('2021-02-12 09:00:00'),
        },
        {
          id: 2,
          name: 'Maria Pereira',
          unimedProtocol: '79998989',
          unimedWallet: '0800546465',
          typeOfHospitalization: 'Cirúrgica',
          sex: 'F',
          sector: 'pronto-socorro',
          createdAt: new Date('2021-02-14 11:00:00'),
        }
      ]
    })
  },
  routes() {
    this.namespace = 'api';
    this.get('/orders', () => {
      return this.schema.all('order')
    })

    this.post('/orders', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('order', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);