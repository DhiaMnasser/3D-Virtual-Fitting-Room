import os
import json
import requests
import pymongo
import sys
from bson.objectid import ObjectId
from dotenv import load_dotenv
from pathlib import Path
from operator import itemgetter

import numpy as np  # linear algebra
import pandas as pd  # for processing data CSV file (e.g. pd.read_csv)


# Libraries for Recommendation System
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

mongoDBConnection = os.getenv(
    'mongodb+srv://admin:admin123@cluster0.pdxx0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
#client = pymongo.MongoClient(mongoDBConnection)

client = pymongo.MongoClient(mongoDBConnection)
db = client['myFirstDatabase']


def column_index(df, query_cols):
    cols = df.columns.values
   # print(cols)
    sidx = np.argsort(cols)
    return sidx[np.searchsorted(cols, query_cols, sorter=sidx)]


def KNN(ratings, data_products, chosen_product):
    #searchFor = "Sony Playstation 4 Pro White Version"
    ##print("chosen product: ")
    print(chosen_product)

    # print(chosen_product)

    data_rating = ratings
    data_products = data_products
    # connected_user = connected_user

    product = data_products.loc[:, {"_id", "productName"}]
    rating = data_rating.loc[:, {"_id", "rating"}]

    data = pd.merge(product, rating)
    data = data.iloc[:18, :]
    # print(data)
    userProductTable = data.pivot_table(
        index=["productName"], columns="productName", values='rating').fillna(0)
    userProductTable.head(18)
    # print(userProductTable.head(10))
    # print(data)

    queryIndex = column_index(data, chosen_product)

    #print("query index: ", queryIndex)
    # print(userProductTable.iloc[queryIndex,:])
    # rint(userProductTable)

    userProductTableMatrix = csr_matrix(userProductTable.values)
    model_knn = NearestNeighbors(metric='cosine', algorithm='brute')
    model_knn.fit(userProductTableMatrix)
    distances, indices = model_knn.kneighbors(
        userProductTable.iloc[queryIndex, :].values.reshape(1, -1), n_neighbors=6)

    name = []
    distance = []

    for i in range(0, len(distances.flatten())):
        if i != 0:
            name.append(userProductTable.index[indices.flatten()[i]])
            distance.append(distances.flatten()[i])

    m = pd.Series(name, name='name')
    d = pd.Series(distance, name='distance')
    recommend = pd.concat([m, d], axis=1)
    # print(recommend)
    recommend = recommend.sort_values('distance', ascending=False)

   # print('Recommendations for {0}:\n'.format(userProductTable.index[queryIndex]))

    # for i in range(0, recommend.shape[0]):
    #print('{0}:{1}, with distance of {2}'.format(i, recommend['name'].iloc[i], recommend['distance'].iloc[i]))

    result = recommend.to_json(orient="records")
    parsed = json.loads(result)
    return json.dumps(parsed, indent=4)


def getSelectedDetails(collection, productId):
    selected_product = collection.find(
        {"_id": productId}, {"_id": True, "productName": True})
    selected_product_ratings = collection.find(
        {"_id": productId}, {"_id": True, 'rating': True})
    return selected_product, selected_product_ratings


def structureRecommended(product_in):
    # 60575bdaa9dd4e15ec654b24
    collection = db['products']
    productId = ObjectId(product_in)
    # get data
    selected_product, selected_product_ratings = getSelectedDetails(
        collection, productId)

    # store data into DataFrames
    data_products = pd.DataFrame(list(selected_product))
    data_ratings = pd.DataFrame(list(selected_product_ratings))

    # structure as readible data
    restructuredData = []
    for item in data_ratings['rating']:

        restructuredData.append({'rating': item['rating']})

    data_restructured = pd.DataFrame(list(restructuredData))
    del data_ratings['rating']

   # print("data_restructured")
    # print(data_restructured)

    # allocating data sets titles and columns in the dataframe therefore readible for the algo
    dataframes = [data_ratings, data_restructured]
    ratings = data_ratings.join(data_restructured).fillna(0)

    # print(ratings)

    # turn into format for KNN
    product = data_products.loc[:, {"_id", "productName"}]
   # print(product)

    for item in product['productName']:
        return item

   # return chosen_product


def findProducts():

    collection = db['products']

    return collection.find({}, {"_id": True, "productName": True})


def findRatings():

    ratings = []
    collection = db['products']

    return collection.find({}, {'_id': True, 'rating': True})


def getData():
    products = findProducts()
    ratings = findRatings()

    # load data sets
    data_products = pd.DataFrame(list(products))
    data_ratings = pd.DataFrame(list(ratings))

    restructuredData = []
    for item in data_ratings['rating']:

        restructuredData.append({'rating': item['rating']})

    data_restructured = pd.DataFrame(list(restructuredData))

    del data_ratings['reviews']

    # allocating data sets titles and columns in the dataframe therefore readible for the algo
    dataframes = [data_ratings, data_restructured]
    ratings = data_ratings.join(data_restructured).fillna(0)
    return(ratings, data_products)


def readInput():
    lines = sys.stdin.readlines()
    return str(lines[0])


def main():

    print('somestring', flush=True)

    # get the data we want
    ratings, data_products = getData()

    # with reviews 60575bdaa9dd4e15ec654b23'
    # alexa 60575bdaa9dd4e15ec654b28
    inputData = readInput()
    product_in = structureRecommended(inputData)

    # compute sum
    results = KNN(ratings, data_products, product_in)

    # return sum

    print(results)


if __name__ == '__main__':
    main()
