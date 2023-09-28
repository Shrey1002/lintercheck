package controller;

/**
 * @author Abhishek Mavani
 * @version 1.0.1
 * @since 09/24/2023
 */

 /**
 * This class update the MapModel. Also receives the acknowledgement for the update and pass it back to the parent GameEngine.
 */

public class MapController {
    
	private Map d_MapModel;


    /**
	 * This method takes the keyword and entire command from the CommandPrompt and then checks it with all the cases.
	 * After checking it performs the specific functionality and returns the feedback accordingly
	 * <ul>
	 * 	<li>If the command is to add continent, country or neighbor, it goes into the first block and calls respective method of map model.</li>
	 *  <li>If the command is to remove continent, country or neighbor, it goes into the second block and calls respective method of map model.</li>
	 *  <li>Counters are used in order to send back feedback on number of country/continent/neighbor added or removed.</li>
	 *  <li>In case of exception thrown by the model during add/remove functionality, this method receives it and delegate to the Game Engine to display on view.</li>
	 * </ul>
	 * @param p_Command The Keyword to access the specific case in the switchcase
	 * @param p_Str The entire command from the CommandPrompt
	 * @return l_ReturnString returns feedback on every functionality performed
	 * @throws Exception throws exception if any error in performing a certain functionality
	 */

    public String editMap(String p_Command, String p_Str)throws Exception {
		String[] l_CommandArray = p_Str.split(" ");
		int l_Counter = 1;
		int l_AddContinentCounter = 0;
		int l_RemoveContinentCounter = 0;
		int l_AddCountryCounter=0;
		int l_RemoveCountryCounter=0;
		int l_AddBorderCounter=0;
		int l_RemoveBorderCounter=0;
		String l_ReturnString = "";
		if(l_CommandArray.length<=1)
			throw new Exception("Please enter valid Parameters!");
		while(l_Counter<l_CommandArray.length) {
			if(l_CommandArray[l_Counter].equals("-add")) {
				switch(p_Command) {
				case "editcontinent":
					if(l_CommandArray.length<3) {
						throw new Exception ("Please add the name of continent and a control value");
					}
					if(l_CommandArray.length<4) {
						throw new Exception ("Please add control value for the continent");
					}
					d_MapModel.addContinent(l_CommandArray[l_Counter+1],l_CommandArray[l_Counter+2]);
					l_Counter+=3;
					l_AddContinentCounter+=1;
					break;
				case "editcountry":
					if(l_CommandArray.length<4) {
						throw new Exception ("Please add continent for the country");
					}
					d_MapModel.addCountry(l_CommandArray[l_Counter+1],l_CommandArray[l_Counter+2]);
					l_Counter+=3;
					l_AddCountryCounter+=1;
					break;
				case "editneighbor":
					if(l_CommandArray.length<4) {
						throw new Exception ("Please add neighbor for the country ");
					}
					d_MapModel.addBorder(l_CommandArray[l_Counter+1], l_CommandArray[l_Counter+2]);
					l_Counter+=3;
					l_AddBorderCounter+=1;
					break;

				}

			}else if(l_CommandArray[l_Counter].equals("-remove")) {
				switch(p_Command) {
				case "editcontinent":
					if(l_CommandArray.length<3) {
						throw new Exception ("Please add continent to remove");
					}
					d_MapModel.removeContinent(l_CommandArray[l_Counter+1]);
					l_Counter+=2;
					l_RemoveContinentCounter+=1;
					break;
				case "editcountry":
					if(l_CommandArray.length<3) {
						throw new Exception ("Please add country to remove");
					}
					d_MapModel.removeCountry(l_CommandArray[l_Counter+1],true); 
					l_Counter+=2;
					l_RemoveCountryCounter+=1;
					break;
				case "editneighbor":
					if(l_CommandArray.length<4) {
						throw new Exception ("Please add neighbor to remove");
					}
					d_MapModel.removeBorder(l_CommandArray[l_Counter+1], l_CommandArray[l_Counter+2]);
					l_Counter+=3;
					l_RemoveBorderCounter+=1;
					break;
				}
			}else {
				throw new Exception("Please Enter a Valid Command. \n If you have added multiple add/remove commands, use showmap command to check the map state.");
			}
		}
		if(l_AddContinentCounter>0) {
			l_ReturnString += "Number of Continents Added : " + l_AddContinentCounter + "\n";
		}
		if(l_RemoveContinentCounter>0) {
			l_ReturnString += "Number of Continents Removed : " + l_RemoveContinentCounter + "\n";
		}
		if(l_AddCountryCounter>0) {
			l_ReturnString += "Number of Countries Added : " + l_AddCountryCounter + "\n";
		}
		if(l_RemoveCountryCounter>0) {
			l_ReturnString += "Number of Countries Removed : " + l_RemoveCountryCounter + "\n";
		}
		if(l_AddBorderCounter>0) {
			l_ReturnString += "Number of Borders Added : " + l_AddBorderCounter + "\n";
		}
		if(l_RemoveBorderCounter>0) {
			l_ReturnString += "Number of Borders Removed : " + l_RemoveBorderCounter + "\n";
		}
		d_MapModel.getContinents();
		if(d_MapModel.getCountryList().size()>0) {
			d_MapModel.getCountries();
		}
		return l_ReturnString;
	}
    
}
