# Segment 2 Deliverables

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

**Description Of Data Exploration**:
During this phase of the project, multiple team members poured over the data to understand the collected variables, their formats, and how they impacted each other. Two members engaged with location data, map data, and ancillary data sets, while another member delved into the accident data super set to identify features for the ML model and begin the process of planning the ETL and encoding. Through this process, it was determined that the ML model should be constructed solely on the accident data as the other data sets would be grouped by state and these values could have lesser value to predicitng accidents compared to the increased featues for the model to handle. Testing these data sets could be done at a later date to determine for sure, but given the time frame of this project, they were used for visualization and dashboard purposes only. 

**Analysis Phase**:
After the initial design of the ML model, many iterations were undertaken to determine how many features should be used and which features would be best suited for contributing to the model's accuracy. These tests were performed using a constantly shifting 20,000 row sample that changed for each model. Due to the size of the dataset and the extreme variance in distribution of entries from smaller vs larger states, using a static 20,000 row sample would likely consistently underrepresent certain states and given the processing power required to perform predictions of larger samples, the size had to be limited to 20,000. Each iteration was performed and compared across 5 different model types (RFM, ROS, SMOTE, RUS, SMOTEENN) to compare accuracy, precisio, and recall. After feature testing completed, it was foun that removing city and county were the best way to maximize the accuracy of the models and that SMOTEEENN was the most accurate with 94.3% accuracy. 

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

**Data Exploration and ETL**:
The initial accident dataset contained 47 columns and 2.9M rows. This data contained information regarding the severity of accident impact on tracffic, location, time, description, address, timezone, weather condition, road features and even the nearest airport or amenities. Since this dataset is intended to help predict the impact on traffic of accidents that occur given certain conditions, there were specific features that were removed outright due to either inability to apply them to the ML model or a lack of value seen in predicting accidents and following that, the data underwent significant processing to streamline it for the model. 

- Removed Features: Incident ID #, Start and End Lat/Lng, End Time, Description, Distance, Address, Country, Timezone, Airport Code, Weather Timestamp, 2 of 3 variations of Twilight, Wind Chill, Amenity, Zipcode and Sunrise/Sunset.

- Start time column changed to date time and expanding it to Year, Month, Day, and Hour to allow for measurement of these features. 

- Cities and Counties were concatenated with State to prevent cities with the same name in different states from being combined. 

- Wind Directions were grouped down to the 8 cardinal directions (N, S, E, W, NE, SE, NW, SW) instead of keeping the original 16. This was done to reduce the number of features in the final model. 

- Wind Direction null values were replaced with Calm or Variable based on whether or not wind speed was 0 or >0 respectively.

- Wind Speed values over 100mph were dropped as there were very few and the values were closer to 400 and 900 mph. Unless it was during a tornado or hurricane, it would be in error and those weather events are more rare in this type of data. Windspeed was also binned in to ranges of 10mph from 0-100 for ease.

- Humidity null values were replaced with 101 to be outside the range of 0-100% and then the values were binned into ranges of 10% with the 101% values being considered “Unknown” so as to save valuable data.

- Day/Night null values were dropped as they were few and could not be determined by the time of day.

- Precipitation null values were set to 0 because if no precipitation was measured it was likely due to the lack of precipitation. Precipitation values over 13in were dropped as well to consolidate the information and then bins were created for each inch of rain from 0-13 inches.

- Temperature null values were set to 500 and values below -30 and above 120 were dropped as outliers so that after binning of temperatures in ranges of 10 degrees F from -30 to 120 with the 500 values set to Unknown, the number of columns was reduced.

- Pressure again had null values set to 500 and pressures over 32 were dropped as outliers. The data was binned into ranges of 2 and the 500’s were set as Unknown. 

- Visibility null values were set to 10 miles as that is considered to be the standard maximum range of visibility at ground level in clear conditions. All values >10 were also set to 10 to eliminate outliers and indicate maximum visibility present. Binning of the data in 1 mile increments from 0-10 allowed for consolidation. 

- Weather Conditions proved to be a much more complex process of preparation. First the variables were entered manually by those creating the data points, so there were in excess of 140 different varieties of entries, many of which were syntax and spelling variations of the same things. Each variable had to be evaluated and then groups of similar entries were consolidated to a single variable (ie ‘Drizzle’ and ‘Light Rain’). This did leave behind combination variables such as ‘Wind/Raind’. To handle this, the column was encoded with get_dummies(), expanding the remaining 77 varables into columns which a for loop and embedded if statements looped through the data set and for each combination column, binary 1’s were added to the component single weather conditions. The combination columns were then dropped.

- Road Feature columns such as ‘Roundabout’ or ‘Junction’ were boolean columns to begin with and so were converted to integers as 0’s and 1’s.  

- Year, Month, Day, and Hour were not converted to objects in preparation for encoding until the end in order to allow for sampling related to these time/date variables until just before encoding. 

- Sampling: because this data set covers the 48 contiguous states and contains 2.9 Million rows of data, sampling of the set was needed for testing and preparation of the final model. Typical starting samples ranged from 10,000 to 200,000. Sampling was also done by State to allow for specific models to be developed for each state. 

- Encoding: When the sample data set was ready, OneHotEncoder was used to encode the data in preparation for the Random Forest Model.

- Training, Testing, and Splitting: Scikit Learn’s train_test_split was used to separate the sample datasets into training and testing groups. Standard split is 25% testing and 75% training. We decided to keep the split this way because we have a very large dataset where we would not require more than 75% of the data to be trained on to feel the model is being trained appropriately. A higher training percentage would have been utilized had the dataset been smaller. We also did not want to risk overfitting the data by using a training percentage of anything greater than 75%.

**Data ETL And Encoding Output Files**:
<br>![ETL/NOT-Encoded CSV](https://drive.google.com/file/d/1P9iGg39S0b0FfpdVdMuAJmwI2ulgz9Co/view?usp=sharing)
<br>![ETL/Encoded CSV](https://drive.google.com/file/d/1-9B3rYYJSuzqqr3IiBnjMFbovYPIOGlE/view?usp=sharing)

**The ML Model**:
A Gradient Boosted Random Forest Model was chosen with SMOTEENN resampling in the current form. This was chosen due to the following parameters:

1. Number of Classes: this is not a binary classification or logistical regression, and RFM’s can handle the multiple target classes.

2. Number of features: because this data set takes into consideration more than 100 (and potentially more than 11,000) different feature columns, a model was needed that could handle a large number of features.

3. Unequal distribution of target concentrations: when exploring the data, it was found that the Severity level 2 was represented more than 10X the combined value of the remaining severity levels. This means that any ML model trained on this set would have a bias toward Level 2. To counteract this, having the option for resampling (be it over sampling, under sampling, or a combination) would allow for a more accurate model. 

4. Random Forest Model increased accuracy: compared with other classification based models, Random Forest Models have been shown to have a higher accuracy of prediction in many cases. This gave reason to make this the first choice for this complex set of data. 

Limitations/Benefits: The SMOTEENN type of model does provide a much more accurate prediction of outcomes in the large scale, but comparisons of the 5 model variations (RFM, ROS, SMOTE, RUS, SMOTEENN) showed fluctuations where other models would have advantages. Certain models like the Random Undersampling showed a suspiciously high accuracy, recall and precision almost every time indicating a high potential for overfitting of the model due to lowering the sample sizes of each test. The models also will perform better given a larger sample size, so once the final feature list is chosen, a largers iteration can be undertaken to see if increased accuracy can be achieved.  

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
