package org.soen6441.model;

import java.util.ArrayList;

/**
 * This Class is for all the Continents  of the Map
 */
public class Continent {
	private static int D_Count=0;
	private int d_ID;
	private String d_Name;
	private int d_ContinentControlValue;
	private ArrayList<Country> d_CountryList;

	/**
	 * This is the Constructor of the class which stores the ID  Name and ContinentControl Value to that Continent Object
	 * It also initializes the CountryList which later stores all the countries belonging to that particular continent
	 * @param p_Name Name of the Continent
	 * @param p_ContinentControlValue Integer representing the ContinentControl Value
	 */

	public Continent(String p_Name, int p_ContinentControlValue) {
		setContinentID(++D_Count);
		this.d_Name=p_Name;
		this.d_ContinentControlValue=p_ContinentControlValue;
		d_CountryList = new ArrayList<Country>();
	}

	/**
	 * This is the setter method to set the value of Id
	 * @param p_Count Integer that has the value to set in the ID
	 */
	public static void setCount(int p_Count) {
		D_Count=p_Count;
	}

	/**
	 * Method to return the Continent Name
	 * @return d_Name  Name of the Continent 
	 */
	public String getContinentName() {
		return this.d_Name;
	}

	/**
	 * Method to get Continent Control Value
	 * @return d_ContinentControlValue  continent control value of that continent
	 */
	public int getContinentControlValue() {
		return d_ContinentControlValue;
	}

	/**
	 * Method to get Continent ID
	 * @return ContinentID  ID of the continent
	 */
	public int getContinentID() {
		return d_ID;
	}

	/**
	 * Method to set Continent ID
	 * @param p_ContinentID ID of the continent
	 */
	public void setContinentID(int p_ContinentID) {
		d_ID = p_ContinentID;
	}

	/**
	 * {@inheritDoc}
	 * Compares the present Continent object with other Continent object and returns true
	 * If the Continent object parameter is empty then it returns false
	 * @param p_Continent Continent Object
	 * 
	 */
	@Override
	public boolean equals(Object p_Continent) {
		if(this == p_Continent) {
			return true;
		}
		if (p_Continent == null || this.getClass() != p_Continent.getClass()) {
			return false;
		}
		Continent l_P1 = (Continent)p_Continent; 
		return this.getContinentName().equals(l_P1.getContinentName());
	}

	/**
	 * Method to add Country to the Continent
	 * @param p_Country Country object
	 */
	public void addCountry(Country p_Country) {
		this.d_CountryList.add(p_Country);
	}

	/**
	 * Method to return the arraylist of all the countries in the continent
	 * @return d_CountryList Arraylist of all countries
	 */
	public ArrayList<Country> getCountryList(){
		return this.d_CountryList;
	}
}