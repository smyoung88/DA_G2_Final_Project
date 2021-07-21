# Segment 1 Deliverables

## Presentation
Topic: Predicting vehicle crash severity based on traffic jams
</br>Reason: **UPDATE HERE**
</br>Description of source data: 
1. Kaggle US Accidents Database
2. BigQuery geo_us_roads.us_national_roads dataset
3. Census Bureau of US Boundaries (States/Counties/Congressional Districts/City Limits Etc)
4. 2010 Vehicle Registration by Date
5. Population Data
6. Kaggle US Demographic Census - 2015
7. Decennial Census - Population Race by State 2010

</br>Questions hoping to answer: **UPDATE HERE**

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
- Present a provisional machine learning model that stands in for the final machine learning model and accomplishes the following:✓ Takes in data in from the provisional database✓ Outputs label(s) for input data 
- **UPDATE HERE**

## Database
Present a provisional database that stands in for the final database and accomplishes the following: ✓ Sample data that mimics the expected final database structure or schema 
✓ Draft machine learning module is connected to the provisional database 

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
 
- Draft machine learning module is connected to the provisional database

## Data Sources
- https://www.kaggle.com/sobhanmoosavi/us-accidents
- https://console.cloud.google.com/marketplace/product/united-states-census-bureau/us-geographic-boundaries?project=final-project-319117&folder=&organizationId=
- https://www.fhwa.dot.gov/policyinformation/statistics/2010/mv1.cfm
- https://www.kaggle.com/muonneutrino/us-census-demographic-data?select=acs2015_county_data.csv
- https://data.census.gov/cedsci/table?q=population&tid=DECENNIALCD1162010.P8
- https://data.census.gov/cedsci/table?q=population&tid=DECENNIALCD1162010.P3
