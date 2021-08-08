# Using Machine Learning to Predict The Severity of Traffic Accidents
![cover_image](https://github.com/smyoung88/DA_G2_Final_Project/blob/main/Images/traffic_data.png)

## Overview
The purpose of this analysis was to explore a traffic accident dataset to see if a machine learning model could predict the traffic impact severity of accidents based on environmental and traffic conditions. The primary accident dataset came from kaggle which had 2.9M rows of accident data from the lower 48 states. The main field in the accident dataset used for the model's prediction was the 'Severity' of accidents, which is a measure of an accident's impact on traffic on a scale of 1 to 4. Psycopg2, which is a DB API 2.0 compliant PostgreSQL driver, was utilized to create a PostgreSQL server database on AWS with a modular approach to python scripts that are used to push, access, and pull data using SQLAlchemy. To clean the dataset, ETL was performed to reconcile unwanted columns, outliers, and NaNs, to make sense of diverse variables, and to bin numerical data for the ease of processing. After data was encoded, the final machine learning model of choice was the SMOTEENN Gradient Boosted Random Forest Model which was ran using google colab notebooks. An unsupervised k means machine learning model was ran on the accident dataset grouped by each state which also included data such as road area, population density, vehicle registrations, blue laws, and marijuana laws to see if it could find any trends in the data. To display the results of these analysis, a dashboard was created with nicepage utilizing javascript, html and css. More detailed descriptions of the database/sources, machine learning models, and dashboard as well as the results can be found below.


## Presentation

**Topic**: Using Machine Learning to Predict The Severity of Traffic Accidents

**Reason**: If we could create a ML model to predict the impact severity on traffic for any given accident, that model could be used to increase the value proposition for mapping companies by improving route predictions. Also, map-based information is great for conveying large amounts of data quickly. And finally, when this dataset was explored, it was found that there were lots of supoprting data to work with.

**Questions For The Data**:
1. Is it possible to accurately predict the severity of accidents on a scale of 1-4 that will occur given the collected data?<br>
2. Which features will provide the greatest support for the ML model?<br>
3. Could an unsupervised ML model find trends when data such as road area, population density, vehicle registrations, blue laws, and marijuana laws are introduced to the accident dataset?<br>

**Source Data**: The primary data source is a large accident report data set that is intended to be used for prediction in the ML model. Supplementary data sets include an overview of roads, vehicle registrations, and other factors for context and gaining better insight into other factors that may impact probabilities of accidents and traffic jams. The accident dataset was sourced through Kaggle and was compiled through multiple APIs targeting streaming, web-based incident report sites. Data regarding road locations and lengths were sourced through Google’s BigQuery service. Vehicle registration data was sourced through government websites. Sources and links are highilighted below:

1. [U.S. Traffic Accidents from 2016 to 2020](https://www.kaggle.com/sobhanmoosavi/us-accidents)
2. [Census Bureau US Boundaries](https://console.cloud.google.com/marketplace/product/united-states-census-bureau/us-geographic-boundaries?project=final-project-319117)
3. U.S. Department of Transportation Vehicle Registration Data [2017](https://www.fhwa.dot.gov/policyinformation/statistics/2017/mv1.cfm) [2018](https://www.fhwa.dot.gov/policyinformation/statistics/2018/mv1.cfm) [2019](https://www.fhwa.dot.gov/policyinformation/statistics/2019/mv1.cfm)
4. [U.S. Census Population Data P8 table](https://data.census.gov/cedsci/table?q=population&tid=DECENNIALCD1162010.P8)
5. [U.S. Census Population Data P3 table](https://data.census.gov/cedsci/table?q=population&tid=DECENNIALCD1162010.P3)
6. [Kaggle U.S. Census Demographic Data](https://www.kaggle.com/muonneutrino/us-census-demographic-data?select=acs2015_county_data.csv)
7. [Blue Laws by State]
8. [Marijuana Laws by State]

**Database Integration** 
To consolidate and share resources, using PSYCOPG2, a Postgres server was created on AWS with a modular approach to the python scripts used to push, access, and pull data using SQLAlchemy. Python’s GETPASS module was taken advantage of to provide team members with access to the database while preventing connection credentials from being displayed on GitHub.<br>
For upstream work, using the Pandas.Dataframe.TO_SQL() function makes it easy to connect to AWS via SQLAlchemy’s Connection Engine, 
while downstream work was exclusively done using written SQL Queries in Python thanks to SQLAlchemy’s EXECUTE command via its Connection object. This was how the dataset was pulled into the Machine Learning model.

**Data Exploration & Processing**:
During this phase of the project, multiple team members poured over the data to understand the collected variables, their formats, and how they impacted each other. Two members engaged with location data, map data, and ancillary data sets, while another member delved into the accident data superset to identify features for the ML model and begin the process of planning the ETL and encoding. Through this process, it was determined that the ML model should be constructed solely on the accident data as the other data sets would be grouped by state and these values could have lesser value to predicting accidents compared to the increased features for the model to handle. Testing these data sets could be done at a later date to determine for sure, but given the time frame of this project, they were used for visualization and dashboard purposes only. 

**Analysis Phase & Outcome**:
After the initial design of the ML model, many iterations were undertaken to determine how many features should be used and which features would be best suited for contributing to the model's accuracy. These tests were performed using a constantly shifting 20,000-row sample that changed for each model. Due to the size of the dataset and the extreme variance in the distribution of entries from smaller vs larger states, using a static 20,000-row sample would likely consistently underrepresent certain states, and given the processing power required to perform predictions of larger samples, the size had to be limited to 20,000. Each iteration was performed and compared across 5 different model types (RFM, ROS, SMOTE, RUS, SMOTEENN) to compare accuracy, precision, and recall. After feature testing was completed, it was found that removing city and county was the best way to maximize the accuracy of the models and that SMOTEEENN was the most accurate with 96.5% accuracy. 

**Slides**:
A link the presentation slides can be found here: [Predicting Car Accident Impact With ML](https://docs.google.com/presentation/d/1MrigJU8uLdrrKApaSzU1UIcLSkl_03eEZ6iXevsZhrs/edit?usp=sharing)

## Database
Due to our need to separate our datasets into many unique files, we used a modular approach to push all .csv files in specific folders to an AWS PostgreSQL database using Python.<br><br>
Using the <b>sqlalchemy</b> and <b>psycopg2</b> libraries, running the `Database_Pusher_Accidents_and_State_Data` notebook file will search for all .csv files located within this repository's `/resources/` and `/output_tables/` folders to push data directly to our AWS instance.
<br><br>
This approach seemed the most appropriate due to the size of our main dataset and the number of people working in it.<br>
Should one of our contributors come up with a unique naming convention, the script to push data to AWS won't bat an eye.<br>
The downside of this approach is the possibility of a user uploading more than they would like since ALL .csv files are collected and pushed.<br>
To combat this potential issue, we have kept our endpoint and password secret and are using Python's nifty getpass library to input the proper credentials whenever we need to update or connect to our database.<br>

For the uninitiated, our raw dataset from Kaggle is over 1GB in size.<br>
While we have setup our Machine Learning model's preprocessing script to retrieved data directly from the database, this is not a very efficient practice.<br>
<br>

### ERD

![ERD_QDBD_Team2](https://user-images.githubusercontent.com/14188580/127789804-0d1fff0f-03b6-45e6-9d7d-0788862e67eb.png)

### Running PostgreSQL Commands With Python - PostgreSQL Joins

SqlAlchemy makes it very easy to use PostgreSQL syntax commands with your database regardless of whether it is local or in the cloud.<br>
In the 'Vellios' folder there is a file named `AWS_Database_Navigator_Joiner` that is our source for pinging the AWS Database instance and retrieving/combining data.<br>

After prompting one of our approved users for database credentials and making the connection with SqlAlchemy, we chose to combine 4 datasets into one table in order to begin the process of building out our State Summary dataset.<br>

![postgresql join command](https://user-images.githubusercontent.com/14188580/127790033-3a70ee32-142c-44a5-a2f8-4a49b56d9bfb.PNG)


## Machine Learning Model
**Initial Model Choice**: Sample-Controlled Gradient Boosted Random Forest Model

This model was chosen for multiple factors and will be used to take in the preprocessed and encoded accident dataset, predicting the severity of accidents based on environmental and road conditions on a scale of 1 to 4 with 1 being the lowest impact on traffic and 4 being the highest impact on traffic. The Sample-Controlled aspect was selected due to the sizable disparity in severity representation where severity 2 level accidents have a more than 10 fold higher representation than that of the other 3 severities combined. With that large of a difference in representation, severity 2 has a high probability of being over-represented in the training model and thus decreasing the accuracy of the model's prediction capability. Gradient boosting was selected to reduce error and increase the accuracy of the model. 

**Data Exploration and ETL**:
The initial accident dataset contained 47 columns and 2.9M rows. This data contained information regarding the severity of accident impact on traffic, location, time, description, address, timezone, weather condition, road features, and even the nearest airport or amenities. Since this dataset is intended to help predict the impact on traffic of accidents that occur given certain conditions, there were specific features that were removed outright due to either inability to apply them to the ML model or a lack of value seen in predicting accidents and following that, the data underwent significant processing to streamline it for the model. 

- Removed Features: Incident ID #, Start and End Lat/Lng, End Time, Description, Distance, Address, Country, Timezone, Airport Code, Weather Timestamp, 2 of 3 variations of Twilight, Wind Chill, Amenity, Zipcode, and Sunrise/Sunset.

- Start time column changed to date time and expanding it to Year, Month, Day, and Hour to allow for measurement of these features. 

- Cities and counties were initially concatenated with states to prevent cities/counties with the same name in different states from being combined, however both City and County features were ultimately dropped due to an increibly high demand for processing from 5234 features being present with all cities and counties represented and the low value of the vast majority of those features. 

- Wind Directions were grouped down to the 8 cardinal directions (N, S, E, W, NE, SE, NW, SW) instead of keeping the original 16. This was done to reduce the number of features in the final model. 

- Wind Direction null values were replaced with Calm or Variable based on whether or not wind speed was 0 or >0 respectively.

- Wind Speed values over 100mph were dropped as there were very few and the values were closer to 400 and 900 mph. Unless it was during a tornado or hurricane, it would be in error and those weather events are rarer in this type of data. Windspeed was also binned into ranges of 10mph from 0-100 for ease.

- Humidity null values were replaced with 101 to be outside the range of 0-100% and then the values were binned into ranges of 10% with the 101% values being considered “Unknown” so as to save valuable data.

- Day/Night null values were dropped as they were few and could not be determined by the time of day.

- Precipitation null values were set to 0 because if no precipitation was measured it was likely due to the lack of precipitation. Precipitation values over 13in were dropped as well to consolidate the information and then bins were created for each inch of rain from 0-13 inches.

- Temperature null values were set to 500 and values below -30 and above 120 were dropped as outliers so that after binning of temperatures in ranges of 10 degrees F from -30 to 120 with the 500 values set to Unknown, the number of columns was reduced.

- Pressure again had null values set to 500 and pressures over 32 were dropped as outliers. The data were binned into ranges of 2 and the 500’s were set as Unknown. 

- Visibility null values were set to 10 miles as that is considered to be the standard maximum range of visibility at ground level in clear conditions. All values >10 were also set to 10 to eliminate outliers and indicate maximum visibility present. Binning of the data in one-mile increments from 0-10 allowed for consolidation. 

- Weather Conditions proved to be a much more complex process of preparation. First, the variables were entered manually by those creating the data points, so there were in excess of 140 different varieties of entries, many of which were syntax and spelling variations of the same things. Each variable had to be evaluated and then groups of similar entries were consolidated to a single variable (ie ‘Drizzle’ and ‘Light Rain’). This did leave behind combination variables such as ‘Wind/Raind’. To handle this, the column was encoded with get_dummies(), expanding the remaining 77 variables into columns which a for loop and embedded if statements looped through the data set, and for each combination column, binary 1’s were added to the component single weather conditions. The combination columns were then dropped.

- Road Feature columns such as ‘Roundabout’ or ‘Junction’ were boolean columns initially and were converted to integers as 0’s and 1’s.  

- Year, Month, Day, and Hour were not converted to objects in preparation for encoding until the end in order to allow for sampling related to these time/date variables until just before encoding. 

- Encoding: Early on when dealing with the Weather_Condition column, Get_Dummmies() was utilized to only encode that one column so that the data set could be easily handled in reconciling the variable subjective entries without having to have the 5000+ columns of a full encoding. When the sample data set was ready for final encoding, OneHotEncoder was used to encode the data for the Random Forest Model.

**Feature Engineering**
Features for this model had to be carefully selected due to relevance and importance to ensure that the model would be able to run appropraitely. The raw number of features even after removing irrelevant information such as ID numbers, descriptions, and lat/long coordinates was more than 17,000 features. This was in large part due to the inclusion of cities and counties. Using improtance calculations (SelectFromModel and 'Importance' from the Random Forest Model) it was shown that most of these features had 0 impact on the model and only served to bog down processing. Even a paid Google Colabs account using a GPU and a high-RAM session proved to be insuffiencient to handle the dataset before culling of features and the model could not be run given the hardware available. Using the calculations and manual testing of the models (shown below), it was shown that the removal of City and County columns allowed for a reduction to 229 features that could then be automatically reduced to best fit the samples being run in the model through the SelectFromModel function. All models ended up running with less than 100 features.

- The SelectFromModel code shows the features that have a greater than median level of importance.
![SelectFromModel_code](https://github.com/smyoung88/DA_G2_Final_Project/blob/main/Images/SelectFromModel_code.png)

- The importance measurement code shows the calculations of how much importance each feature contributed.
![importance_measurement_code](https://github.com/smyoung88/DA_G2_Final_Project/blob/main/Images/importance_measuring_code.png)

- Manual feature testing showed the ideal features to remove. (Note: CNP means "Could Not Perform")
![feature_selection_metrics](https://github.com/smyoung88/DA_G2_Final_Project/blob/main/Images/feature_selection_metrics.png)

**Sampling**
Sampling of the data set was varied depending on the processes being undertaken. For testing of features, samples of 20,000 were used because many models needed to run and large sample sizes too a great deal of time. During assessment, features were considered based on feature type group so that either an entire group  (ie Weather_Condition or City) was kept or dropped based on the whole group's relevance. This prevented certain specific features like 'Dust_Whirls' from being dropped if weather conditions as a whole provided great importance but that specific one was underrepresented in the sample. 
Sampling for the final models was determined based on the available entries for the chosen set of data. For instance the national model was capped at 100,000 because samples over that did not increase accuracy and only served to require greater processing time, and state models used as many entries as possible up to that 100,000 limit. This did prove that a number of states were underrepresented in the data set with some states having less than 5000 entries compared to other states that reached the 100,000 limit. This later proved to be an issue with overfitting of the models. 

- Sample testing is shown here:
![feature_number_and_sample_size_metrics](https://github.com/smyoung88/DA_G2_Final_Project/blob/main/Images/feature_number_and_sample_size_metrics.png)

**Train/Test Splitting**
- Training, Testing, and Splitting: Scikit Learn’s train_test_split was used to separate the sample datasets into training and testing groups. The standard split is 25% testing and 75% training. We decided to keep the split this way because we have a very large dataset where we would not require more than 75% of the data to be trained on to feel the model is being trained appropriately. A higher training percentage would have been utilized had the dataset been smaller. We also did not want to risk overfitting the data by using a training percentage of anything greater than 75%.

**Data ETL And Encoding Output Files**:
<br>[ETL/NOT-Encoded CSV](https://drive.google.com/file/d/1P9iGg39S0b0FfpdVdMuAJmwI2ulgz9Co/view?usp=sharing)************************
<br>[ETL/Encoded CSV](https://drive.google.com/file/d/1-9B3rYYJSuzqqr3IiBnjMFbovYPIOGlE/view?usp=sharing)************************

**The ML Model**:
The SMOTEENN Gradient Boosted Random Forest Model (SMOTEEN GB RFM) was our final chosen model for the national supervised ML model, however we did run 5 different models concurrently (Gradient Boosted Random Forest Model without resampling, Random Oversampling, SMOTE Oversampling, Random Undersampling, and SMOTEENN Combination Resampling). This was done initially to confirm that our model choice was in fact the most accurate, however upon running the state models, we realized that certain states did not possess enough entries for the SMOTE or SMOTEENN models to run and thus we had to downgrade the model for certain states to Random Oversampling or the Gradient Boosted Random Forest Model with no sampling assistance so that we could include those states. 

**Model Choice Explanation** 
The SMOTEENN GB RFM was chosen due to the following parameters:

1. Number of Classes: this is not a binary classification or logistical regression, and RFM’s can handle the multiple target classes.

2. Number of features: because this data set takes into consideration more than 100 (and potentially more than 5,000) different feature columns, a model was needed that could handle a large number of features.

3. Unequal distribution of target concentrations: when exploring the data, it was found that the Severity level 2 was represented more than 10X the combined value of the remaining severity levels. This means that any ML model trained on this set would have a bias toward Level 2. To counteract this, having the option for resampling (be it oversampling, under-sampling, or a combination) would allow for a more accurate model. 

4. Random Forest Model increased accuracy: compared with other classification-based models, Random Forest Models have been shown to have a higher accuracy of prediction in many cases. This gave reason to make this the first choice for this complex set of data. 

**Limitations and Benefits**  
While the SMOTEEN GB RFM proved to be the overall more consistently accurate model, we did have some issues related to the ability to perform the model due to available data for specific states either preventing the model form having enough points to run with or even samples being so small that most of the models over fit the data and became unreliable. To work around this limitation, we continued the use of all 5 models and would downgrage the level of the model if it could not be performed or if accuracy was above 99%, in which case, the next lowest model that worked and provided an accuracy of less than 99% was selected. These choices can be seen in the maps on the dashboard and in the provided spreadheet images here in the README. Benefits of the SMOTEENN GB RFM were consistent best accuracy, recall, and precision compared to the the other models when the data size was large enough and with feature numbers and sample size controlled, the processing time for this model was longer but reasonable and able to be performed repeatedly wtih ease. 

- State and national model outcomes show how the different sampling options performed
![state_and_national_outcomes](https://github.com/smyoung88/DA_G2_Final_Project/blob/main/Images/state_and_national_outcomes.png)

**Modifications Between Segment 2 And Segment 3**
From the beginning, our group sought to choose and design the optimal model, without starting with a known lesser model. The design for the SMOTEEN GB RFM was the intent from the onset, but where we inteded to initially use the other 4 models (GB RFM, ROS, SMOTE, and RUS) just to confirm the accuracy benefit of our model selection, we realized at this point that we would need to keep the other models to ensure we could create predictions for states with insufficient data points. It was also at this time where we found that sample sizes over 100,000 did not produce increased accuracy in the national model and thus allowed us to cap the sample size and maintain a reasonable processing period. 

**Training The Model** 
The model was trained by fitting the data samples (either standard samples or resampled samples) into the Gradient Boosted Random Forest model with n_estimators=100 and features determined by calculation wtih SelectFromModel. 

- The SMOTEENN GB RFM code:<br>

![smoteenn_ml_code](https://github.com/smyoung88/DA_G2_Final_Project/blob/main/Images/smoteen_ml_code.png)

**Confusion Matrix**
Due to the nature of this model having 4 target vectors, a standard confusion matrix including only True Positives, False Positive, True Negatives, and False Negatives was not possible. The confusion matrix instead showed a breakdown of how many of the predictions fell into each of the potential target vectors (columns) given the correct target vector (rows). Rows are the actual severities and columns are the predictions. For instance, the value at row 1, column 1 shows the total number of predictions for severity 1 of those entries that were actually severity 1. row 1, column 2 shows how many of the actual severity 1 entries were predicted to be severity 2 and so forth and so on.

- Confusion matrix output for the national model:
<img height=50% width=50% src='https://github.com/smyoung88/DA_G2_Final_Project/blob/main/Images/confusion_matrix_output.png'>

**Final Outcomes And Accuracy**
The final outcomes of the national and state models gave us an overall national accraucy of 86.3% and state accuracies that ranged from 78.1% to 99%. The median state accuracy was above 90%. The final sampling option chosen for each state was determined by identifying the most accurate model was below 99% to prevent overfitting of the model. This includes those states that could not perform the SMOTE or SMOTEENN resampling. 

- Final national model output:
<img height=50% width=50% src='https://github.com/smyoung88/DA_G2_Final_Project/blob/main/Images/national_model_outcomes.png'>

<br>

## Dashboard

**Visualizations and Website**:  Development of the final website continues in this phase of the project and the site remains live for preview.  Elements added include refinements to the table page, and a presentation tab that mirrors the Google Slides file.  The visualizations created on for the dashboard were created with Tableau, using the Kaggle dataset.  The final dashboard will include a visualization detailing the final accuracy of the machine learning model by state as well as an adjusted "crash index" which will take into account adjustments for state population and registered vehicles for that state.  
<br>Link to the outline of the webpage can be found found <a href="https://frostbrosracing.github.io/CrashSite/">here</a>.<br>
Deliverable 2 Visualizations and Website files can be found <a href="https://github.com/smyoung88/DA_G2_Final_Project/tree/frost/Frost">here</a>.<br>
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
The table view has been refined for a more streamlined appearance.  Currently, there are only 100,000 rows of data contained within the table view.  This gives a random sampling of the entire accident dataset.
<br>
![accidents_table](https://user-images.githubusercontent.com/77071776/127788585-097481a4-b546-4c4d-a9c9-71c7622ad63e.jpg)
<br>
