// run 
import $ from 'jquery';
import DocSearch from './docsearch.js';
import './styles.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


$(document).ready(function() {
  $('#search-button').click(function(){
    const newDocSearch = new DocSearch;
    const symptoms = $('#symptoms').val();
    $('#symptoms').val('');
    const mdFirstName = $('#doctor-first-name').val();
    $('#doctor-first-name').val('');
    const mdLastName = $('#doctor-last-name').val();
    $('#doctor-last-name').val('');
    $ajax({
      url: 
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response){
        newDocSearch.noResults = response.meta.total;
        if (newDocSearch.noResults == 0) {
          $('#results').html('<h2>Results:</h2><p>No doctors found that meet your criteria. Please try again.</p>')
          } else {
          newDocSearch.name = response.data[0].practices[0].name;
          newDocSearch.picture = response.data[0].profile.image_url;
          newDocSearch.street = response.data[0].practices[0].visit_address.street;
          

      }


    })
    event.preventDefault();


      });
  });

