# Segment 1 Deliverables

## Presentation

**Topic**: Prediction of motor vehicle accident (MVA) impacts on traffic using machine learning.

**Reason**: If a map and directions application like Waze or Google Maps could use an ML model to predict the likelihood of accidents that could impact traffic based on environmental conditions, road features, physical locations, and other factors, they could provide better route recommendations and improve the value proposition to app users/purchasers.

**Source Data**: The primary data source is a large accident report data set that is intended to be used for prediction in the ML model. Supplementary data sets include an overview of roads, vehicle registrations, and other factors for context and gaining better insight into other factors that may impact probabilities of accidents and traffic jams. The accident dataset was sourced through Kaggle and was compiled through multiple APIs targeting streaming, web-based incident report sites. Data regarding road locations and lengths were sourced through Google’s BigQuery service. Vehicle registration data was sourced through government websites.

1. Kaggle US Accidents Database
2. BigQuery geo_us_roads.us_national_roads dataset
3. Census Bureau of US Boundaries (States/Counties/Congressional Districts/City Limits Etc)
4. 2010 Vehicle Registration by Date
5. Population Data
6. Kaggle US Demographic Census - 2015
7. Decennial Census - Population Race by State 2010

**Questions For The Data**:
1. Is it possible to accurately predict the severity of accidents that will occur given the collected data?<br>
2. Which features will provide the greatest support for the ML model?<br>
3. Could other factors such as road area, population density, vehicle registrations, blue, laws, marijuana laws, or other factors improve the accuracy of the model?<br>

**Visualizations and Website**:  The website is in development but is currently live for preview.  
<br>Link to the outline of the webpage can be found found <a href="https://frostbrosracing.github.io/CrashSite/">here</a>.<br>
Deliverable 1 Visualizations and Website files can be found <a href="https://github.com/smyoung88/DA_G2_Final_Project/tree/frost/Frost">here</a>.<br>
<br>
![home](https://user-images.githubusercontent.com/77071776/126848202-2700edfd-edc4-43b8-824f-c01e2ed2ab71.jpg)
<br>
<br>
A Dropdown menu is available to select from the lower 48 states plus the District of Columbia.
<br>
![dropdown](https://user-images.githubusercontent.com/77071776/126848223-95751de2-5f77-489b-9633-ec41a63b8079.png)
<br>
<br>
The tooltip opens upon hovering over an accident site.  
<br>
![tooltip](https://user-images.githubusercontent.com/77071776/126848231-86bb86e8-a4e5-4aae-91d8-21f35c841166.png)
<br>
<br>
The accident locations can be filtered on the map by severity (from 1 - 4).  The population data in the legend was provided by the Tableau US Census data for 2018.  This map view and the population layer was chosen specifically because the dense population areas clearly show the prevalence of traffic accidents.
<br>
![severity_filter_and_population](https://user-images.githubusercontent.com/77071776/126848798-70c99000-886a-4eaa-97a5-51f868107806.png)
<br>
<br>
The table view needs to be refined for a more streamlined appearance.  Currently, there are only 100,000 rows of data contained within the table view.  The plan is to get much more, if not all of the Kaggle dataset accessible in the table view.
<br>
![table](https://user-images.githubusercontent.com/77071776/126848236-75347f77-b6e4-4d1d-a1cd-12acaa6eaf4b.png)
<br>
<br>
The `Analysis` tab will have a full summary of the Machine Learning model with visualizations.



## GitHub

### Communication Protocols
- Main communication used for this project is via a private Slack channel
- Live video meetings are utilized every Tuesday and Thursday for four weeks
- Individual working files were created for each team member
- Individual branches were created for each team member while working in respective personal files for an added layer of file protection

### Individual Branches
- TaylorBranch
- YoungBranch
- colin_branch
- frost

## Machine Learning Model
**Initial Model Choice**: Sample-Controlled Gradient Boosted Random Forest Model

This model was chosen for multiple factors and will be used to take in the preprocessed and encoded accident dataset, predicting the severity of accidents based on environmental and road conditions on a scale of 1 to 4 with 1 being the lowest impact on traffic and 4 being the highest impact on traffic. The Sample-Controlled aspect was selected due to the sizable disparity in severity representation where severity 2 level accidents have a more than 10 fold higher representation than that of the other 3 severities combined. With that large of a difference in representation, severity 2 has a high probability of being over-represented in the training model and thus decreasing the accuracy of the model's prediction capability. Gradient boosting was selected to reduce error and increase the accuracy of the model. 

## Database
Due to our need to separate our datasets into many unique files, we used a modular approach to push all .csv files in specific folders to pgAdmin using Python.<br>
Using the <b>sqlalchemy</b> and <b>psycopg2</b> libraries, running the `Database_Pusher_Accidents_and_State_Data` notebook file will search for all .csv files located within this repository's '/resources/' and '/resources/non_freeway_roads/' folders to push data directly to pgAdmin.
<br>
This approach seemed the most appropriate due to the age of this repository and the number of people working in it.<br>
Should one of our contributors come up with a unique naming convention, the script to push data to pgAdmin won't bat an eye.<br>
The downside of this approach is the possibility of a user uploading more than they would like since ALL .csv files are collected and pushed.<br>

The raw dataset from Kaggle that we based our accident data on is over 1GB in size.<br>
Combine this large file with 50 unique tables of State Roads (non_freeway_roads), and you are likely to face a lengthy amount of time sending everything to pgAdmin.<br>
Our contributors ranged in elapsed runtime between 732.8 seconds to over 1400 for over 2.5GB of data.<br>

![outputtime_pusher](https://user-images.githubusercontent.com/14188580/126883327-899baf68-acc7-4354-b49e-b39fecccd49a.PNG)
<br>
In pgAdmin, to access this data you will have to pass through the public schema to hit each table.<br>

![schema_accidents_dataset](https://user-images.githubusercontent.com/14188580/126883393-1cc49927-4361-4369-8841-c4f3fb545975.PNG)
<br>

Because we used Python to send data directly to a database within pgAdmin, WITHOUT declaring Schemas, the schema is technically undefined.<br>
By following the syntax shown in the image above, tables can be accessed with minimal effort.<br>
We are sticking with this approach until we learn more about connecting with AWS on Tuesday to determine if that is an approach that will benefit us as we move forward with this project.<br>
<br><br>

## Data Sources
- https://www.kaggle.com/sobhanmoosavi/us-accidents
- https://console.cloud.google.com/marketplace/product/united-states-census-bureau/us-geographic-boundaries?project=final-project-319117&folder=&organizationId=
- https://www.fhwa.dot.gov/policyinformation/statistics/2010/mv1.cfm
- https://www.kaggle.com/muonneutrino/us-census-demographic-data?select=acs2015_county_data.csv
- https://data.census.gov/cedsci/table?q=population&tid=DECENNIALCD1162010.P8
- https://data.census.gov/cedsci/table?q=population&tid=DECENNIALCD1162010.P3
