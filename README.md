# Recipe Search
This sample application demonstrates:

* Searching for recipes by keywords, _and_
* Creating new recipes and saving them in Elasticsearch

This sample application uses jQuery and a bit of Bootstrap CSS. These choices are deliberate. I wanted the non-Elasticsearch-related parts of this code to use well-known frameworks so that code doesn't distract from the Elasticsearch-related code, which is the focus of this demonstration.

## Running this on your own machine

1. Download and unzip Elasticsearch

  ```
  wget 'https://download.elastic.co/elasticsearch/elasticsearch/elasticsearch-2.3.4.zip'
  unzip elasticsearch-2.3.4.zip
  ```

2. Allow Elasticsearch to receive requests from the browser.

  ```
  cd elasticsearch-2.3.4
  ```

  Edit `config/elasticsearch.yml` and add the following lines to it:

  ```
  http.cors.enabled: true
  http.cors.allow-origin: http://localhost:8000
  ```

3. Start a 1-node Elasticsearch cluster

  ```
  ./bin/elasticsearch # The process started by this command corresponds to a single Elasticsearch node
  ```

  By default the Elasticsearch node's REST API will be available at http://localhost:9200, unless port 9200 is already taken. In that case Elasticsearch will automatically choose another port. Read through the log messages emitted when you start the node, and look for a log message containing `http`. In this message, look for `bound_address` and note the port shown in the accompanying network address.

3. Clone this repository

  ```
  git clone https://github.com/ycombinator/recipe-search-with-elasticsearch-and-jquery.git
  ```

4. Serve the Recipe search application web site

  ```
  cd recipe-search-with-elasticsearch-and-jquery
  python -m SimpleHTTPServer
  ```

5. Open the Recipe search application web site in your browser

  ```
  open http://localhost:8000
  ```
