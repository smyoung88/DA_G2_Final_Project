# Segment 1 Deliverables

## Presentation

**Topic**: Prediction of motor vehicle accident (MVA) impacts on traffic using machine learning.

**Reason**: If a map and directions application like Waze or Google Maps coud use an ML model to predict the likelihood of accidents that could impact traffic based on environmental conditions, road features, physical locations, and other factors, they could provide better route recommendations and improve value proposition to app users/purchasers.

**Source Data**: The primary data source is a large accident report data set that is intended to be used for prediction in the ML model. Supplementary data sets include overview of roads, vehicle registrations, and other factorsfor the purpose of context and gaining better insight into other factors that may impact probabilities of accidents and traffic jams. The accident dataset was sourced through Kaggle and was compiled through multiple API’s targeting streaming, web-based incident report sites. Data regarding road locations and lengths was sourced through Google’s BigQuery service. Vehicle registration data was sourced through government websites.

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
<br>Link to outline of final deliverable webpage found <a href="https://frostbrosracing.github.io/CrashSite/">here</a><br>
![home](https://user-images.githubusercontent.com/77071776/126848202-2700edfd-edc4-43b8-824f-c01e2ed2ab71.jpg)
<br>
![dropdown](https://user-images.githubusercontent.com/77071776/126848223-95751de2-5f77-489b-9633-ec41a63b8079.png)
<br>
![tooltip](https://user-images.githubusercontent.com/77071776/126848231-86bb86e8-a4e5-4aae-91d8-21f35c841166.png)
<br>
The table view needs to be refined for a more streamlined appearance.  Currently, there are only 100,000 rows of data contained within the table view.  The plan is to get much more, if not all of the Kaggle dataset accessible in the table view.
<br>
![table](https://user-images.githubusercontent.com/77071776/126848236-75347f77-b6e4-4d1d-a1cd-12acaa6eaf4b.png)



## GitHub

### Communication Protocols
- Main communicaiton used for this project is via private Slack channel
- Live video meetings are utilized every Tuesday and Thursday for four weeks
- Individual working files were created for each team member
- Individual branches were created for each team member while working in respective personal files for added layer of file protection

### Individual Branches
- TaylorBranch
- YoungBranch
- colin_branch
- frost

## Machine Learning Model
**Initial Model Choice**: Sample-Controlled Gradient Boosted Random Forest Model

This model was chosed for multiple factors and will be used to take in the preprocessed and encoded accident dataset, prediciting the severity of accidents based on environmental and road conditions on a scale of 1 to 4 with 1 being the lowest impact on traffic and 4 being the highest impact on traffic. The Sample-Controlled aspect was selected due to the sizable disparity in severity representation where severity 2 level accidents have a more than 10 fold higher represenation than that of the other 3 severities combined. With that large of a difference in representation, severity 2 has a high probability of being over-represented in the training model and thus decreasing accuracy of the model's prediction capabilty. Gradient boosting was chosen was selected with the intention of reducing error and increasing accuracy of the model. 

**UPDATE HERE**

## Database
Present a provisional database that stands in for the final database and accomplishes the following:<br>✓ Sample data that mimics the expected final database structure or schema 
<br>✓ Draft machine learning module is connected to the provisional database 

**UPDATE BELOW**

SCHEMA:
road_id: int
full_name: str
route_type: str (classification)
mtfcc_feature_class_code: str (idk what this is, docs say somewhere)
state_fips_code: int (unnecessary, can be dropped)
state_name: str
road_geom: LINESTRING -  (geojson compatible list of coordinate points)

filtering street names and taking coordinates to determine:
* total mileage of available roads per state/county
* classification of road (hwy, street, etc)
 
**Draft machine learning module is connected to the provisional database**

## Data Sources
- https://www.kaggle.com/sobhanmoosavi/us-accidents
- https://console.cloud.google.com/marketplace/product/united-states-census-bureau/us-geographic-boundaries?project=final-project-319117&folder=&organizationId=
- https://www.fhwa.dot.gov/policyinformation/statistics/2010/mv1.cfm
- https://www.kaggle.com/muonneutrino/us-census-demographic-data?select=acs2015_county_data.csv
- https://data.census.gov/cedsci/table?q=population&tid=DECENNIALCD1162010.P8
- https://data.census.gov/cedsci/table?q=population&tid=DECENNIALCD1162010.P3
