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
          newDocSearch.city = response.data[0].practices[0].visit_address.city;
          newDocSearch.state = response.data[0].practices[0].visit_address.state;
          newDocSearch.zip = response.data[0].practices[0].visit_address.zip;
          newDocSearch.phone = response.data[0].practices[0].phones[0].number;
          newDocSearch.patients = response.data[0].practices[0].accepts_new_patients;

          if (newDocSearch.patients == true) {
            newDocSearch.patients = "Yes";
          } else {
            newDocSearch.patients = "No";
          }
          if (newDocSearch.noResults == 0) {
            $('#results').html('<h3>No providers in your area match your search critera.</h3>')
          }
          $('#results').html('<h3>Results:</h3><p>' newDocSearch.name + '</p><img src"' + newDocSearch.picture + '"><p>' + newDocSearch.street + '</p><p></p>' + newDocSearch.city + ', ' + newDocSearch.state + '' + newDocSearch.zip + '</p><br><p>Accepting new patients: ' + newDocSearch.patients + '</p><p>Phone:' + newDocSearch.phoneNumber </p>');
       }
     },
       error: function() {
       $('#results').append("We're having technical difficulties, please try again later.")
       }
     });
    });
  });

