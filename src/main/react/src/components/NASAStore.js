// NASAStore.js
import {create} from 'zustand';
import axios from 'axios';

const useNASAStore = create((set) => ({
  nasaData: [],
  fetchNASAData: async (date, startDate, endDate, count) => { // Accept parameters
    try {
      const response = await axios.get('/apod', {
        params: {
          date: date || '',
          startdate: startDate || '',
          enddate: endDate || '',
          count: count || '',
          thumbs: true,
        },
      });
      set({ nasaData: response.data });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
}));

export default useNASAStore;
