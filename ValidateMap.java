package controller;

import java.util.ArrayList;
import java.util.HashMap;

import model.Continent;
import model.Country;

/**
 * This class checks the validity of the map by converting into a graph object.
 */
public class ValidateMap {
	int d_VertexCount;
	ArrayList<ArrayList<Integer>> d_VertexList;

	/**
	 * This constructor of a class initialize the adjacency list representation of
	 * graph.
	 * 
	 * @param p_VertexCount This is the size of which adjacency list will be
	 *                      created.
	 */
	public ValidateMap(int p_VertexCount) {
		d_VertexCount = p_VertexCount;
		d_VertexList = new ArrayList<>(d_VertexCount);
		for (int l_I = 0; l_I < d_VertexCount; l_I++) {
			d_VertexList.add(new ArrayList<Integer>());
		}
	}

	/**
	 * This constructor receives country and continent objects and use them to add
	 * into adjacency list of graph.
	 * 
	 * @param p_CountryObjects   List of country objects stored in the map model.
	 * @param p_ContinentObjects List of continent objects stored in the map model.
	 * @throws Exception If any continent doesn't have a country, it notifies the
	 *                   user.
	 */
	public ValidateMap(ArrayList<Country> p_CountryObjects, ArrayList<Continent> p_ContinentObjects) throws Exception {
		if (checkCountryAndContinent(p_CountryObjects, p_ContinentObjects)) {
			checkContinentIsConnectedSubgraph(p_ContinentObjects);
			HashMap<Integer, ArrayList<Integer>> l_HMap;
			l_HMap = updateCount(p_CountryObjects);
			d_VertexCount = l_HMap.size();
			d_VertexList = new ArrayList<>(d_VertexCount);
			for (int l_I = 0; l_I < d_VertexCount; l_I++) {
				d_VertexList.add(new ArrayList<Integer>());
			}
			assignBorders(l_HMap);
		} else {
			throw new Exception("There should be atleast one country for a continent");
		}
	}

	/**
	 * This method calls DFS for original graph and transposed graph.
	 * 
	 * @return String "Map is Valid" if dfs is passed else "Map is not Valid"
	 */
	public String isValid() {
		boolean l_B1 = runDFS(0);
		ValidateMap l_TempMap = getTranspose(this.d_VertexList);
		boolean l_B2 = l_TempMap.runDFS(0);
		if (l_B1 && l_B2) {
			return "Map is Valid";
		}
		return "Map is not Valid";
	}

	/**
	 * This method takes the arraylist of country objects and creates a new hashmap
	 * which is then returned to validation method
	 * All the updation in countryid and their respective borders after
	 * addition/removal is taken care for the sake of validation.
	 * 
	 * @param p_CountryObjects List of country objects
	 * @return d_UpdatedMap Hashmap which contains the updated ID and their
	 *         respective borders of each country
	 */
	public HashMap<Integer, ArrayList<Integer>> updateCount(ArrayList<Country> p_CountryObjects) {
		int l_Sequence = 0, l_ID;
		ArrayList<String> l_UpdatedNeighbors = new ArrayList<String>();
		ArrayList<Country> l_NCountryObjects = p_CountryObjects;
		HashMap<Integer, Integer> l_UpdatedIDCount = new HashMap<Integer, Integer>();
		HashMap<Integer, ArrayList<Integer>> l_UpdatedMap = new HashMap<Integer, ArrayList<Integer>>();
		for (Country l_C : l_NCountryObjects) {
			l_Sequence++;
			l_UpdatedIDCount.put(l_C.getCountryID(), l_Sequence);
		}
		for (Country l_C : l_NCountryObjects) {
			ArrayList<Integer> l_StoreNeighbors = new ArrayList<Integer>();
			l_ID = l_UpdatedIDCount.get(l_C.getCountryID());
			l_UpdatedNeighbors = l_C.getBorder();
			for (String l_S : l_UpdatedNeighbors) {
				for (Country l_C2 : l_NCountryObjects) {
					if (l_C2.getCountryName().equals(l_S)) {
						int l_NewNeighborID = l_UpdatedIDCount.get(l_C2.getCountryID());
						l_StoreNeighbors.add(l_NewNeighborID);
					}
				}
			}
			l_UpdatedMap.put(l_ID, l_StoreNeighbors);
		}
		return l_UpdatedMap;
	}

	/**
	 * This method fill all the values in the adjacency graph representation (i.e.
	 * d_VertexList).
	 * 
	 * @param p_HMap This parameter is the updated hash map created in updateCount
	 *               method
	 */
	public void assignBorders(HashMap<Integer, ArrayList<Integer>> p_HMap) {
		try {
			for (int l_I = 1; l_I < p_HMap.size() + 1; l_I++) {
				if (p_HMap.get(l_I) != null) {
					ArrayList<Integer> l_TempBorderList = p_HMap.get(l_I);
					for (Integer l_TempBorderId : l_TempBorderList) {
						addBorder(l_I - 1, l_TempBorderId - 1);
					}
				}
			}
		} catch (Exception l_E) {
			System.out.println("Exception while assigning borders in validate map : " + l_E.getMessage());
		}
	}

	/**
	 * This method add the border 'p_V' at the index position 'p_U'
	 * 
	 * @param p_U index of the arraylist where border has to be added.
	 * @param p_V value to be added in the arraylist
	 */
	public void addBorder(int p_U, int p_V) {
		d_VertexList.get(p_U).add(p_V);
	}

	/**
	 * This method checks if every continent has at least one country
	 * 
	 * @param p_CountryObjects   List of country objects
	 * @param p_ContinentObjects List of continent objects
	 * @return true if all continents have at least one country. false otherwise.
	 */
	public boolean checkCountryAndContinent(ArrayList<Country> p_CountryObjects,
			ArrayList<Continent> p_ContinentObjects) {
		for (Continent l_C1 : p_ContinentObjects) {
			if (l_C1.getCountryList().size() < 1) {
				return false;
			}
		}
		return true;
	}

	/**
	 * This method returns true if graph is connected.
	 * DFS starts from one index and try to reach every other index from there.
	 * This is checked for all the index present in the graph.
	 * 
	 * @param p_Start starting point of the DFS traversal.
	 * @return returns true if all countries are traversed from the starting point.
	 *         false otherwise.
	 */
	public boolean runDFS(int p_Start) {
		boolean[] l_NodeVisited = new boolean[d_VertexCount];
		markVisited(p_Start, l_NodeVisited);
		for (boolean l_B : l_NodeVisited) {
			if (!l_B)
				return false;
		}
		return true;
	}

	/**
	 * This method is called from DFS function which sets the visited flag to true.
	 * Also this method is called recursively for all the countries that are
	 * connected from the starting point.
	 * 
	 * @param p_Start       Starting point of the DFS function.
	 * @param p_NodeVisited boolean array which keeps track of which countries are
	 *                      visited and which are not visited.
	 */
	private void markVisited(int p_Start, boolean[] p_NodeVisited) {
		p_NodeVisited[p_Start] = true;
		for (int l_I : d_VertexList.get(p_Start)) {
			if (!p_NodeVisited[l_I]) {
				markVisited(l_I, p_NodeVisited);
			}
		}
	}

	/**
	 * This method takes the transpose of the graph.
	 * For Example : If there is a border between country 1 to 2, it will become 2
	 * to 1
	 * 
	 * @param p_VertexList list of vertices in the graph. (list of countries and
	 *                     their borders)
	 * @return new validate map object which holds the transposed vertex list.
	 */
	public ValidateMap getTranspose(ArrayList<ArrayList<Integer>> p_VertexList) {
		ValidateMap l_TempMap = new ValidateMap(p_VertexList.size());
		for (int l_I = 0; l_I < p_VertexList.size(); l_I++) {
			for (int l_J : p_VertexList.get(l_I)) {
				l_TempMap.addBorder(l_J, l_I);
			}
		}
		return l_TempMap;
	}

	/**
	 * This method takes list of continents as a parameter and check if all the
	 * countries within that continent is internally connected.
	 * 
	 * @param p_ContinentObjects List of continents objects
	 * @throws Exception throws custom exception when all countries within
	 *                   particular continent are not connected.
	 */
	public void checkContinentIsConnectedSubgraph(ArrayList<Continent> p_ContinentObjects) throws Exception {
		HashMap<Integer, ArrayList<Integer>> l_CountryMapForEachContinent = new HashMap<Integer, ArrayList<Integer>>();
		for (Continent l_C : p_ContinentObjects) {
			ArrayList<Country> l_Country = l_C.getCountryList();
			l_CountryMapForEachContinent = updateCount(l_Country);
			d_VertexCount = l_CountryMapForEachContinent.size();
			d_VertexList = new ArrayList<>(d_VertexCount);
			for (int l_I = 0; l_I < d_VertexCount; l_I++) {
				d_VertexList.add(new ArrayList<Integer>());
			}
			assignBorders(l_CountryMapForEachContinent);
			String l_Return = isValid();
			if (l_Return.equals("Map is not Valid")) {
				throw new Exception("The countries inside " + l_C.getContinentName() + " are not internally Connected");
			}
		}
	}
}
