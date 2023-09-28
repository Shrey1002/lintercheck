package controller;

import java.awt.event.ActionListener;

import model.GameModelNew;
import view.CommandPrompt;
import java.util.ArrayList;

import model.GameModelNew;
import model.Player;
import view.CommandPrompt;

/**
 * This is the main controller class of MVC model,
 * This class has a references of View, Models and various child controllers.
 * This class acts as an intermediary between models/controllers and view.
 */
public class GameEngine {
    private GameModelNew d_GameModelNew;
    private CommandPrompt d_CpView;
    private MapController d_MapController;
    private ArrayList<Player> d_PlayerList;
    private PlayerController d_PlayerController;

    /**
     * This controller takes view and model as arguments and use throughout the
     * game.
     * 
     * @param p_CpView    main view of the game.
     * @param p_GameModel main model of the game.
     */
    public GameEngine(CommandPrompt p_CpView, GameModelNew p_GameModel) {
        d_GameModelNew = p_GameModel;
        d_CpView = p_CpView;
        d_MapController = new MapController(this.d_GameModelNew.getMap());
        d_CpView.commandSendButtonListener(new CommandListener());
    }

    /**
	 * This is a child class of the GameEngine which listens to the actions performed by button in view. 
	 * This class implements the ActionListener and override the actionPerformed method.
	 * This class is responsible for passing data from view to models/child controllers.
	 */
	public class CommandListener implements ActionListener{
		private boolean d_MapDone = false;

		/**
		 * {@inheritDoc}
		 * On click of the button in view, this method gets the string which user entered. 
		 * Based on the type of the command, it will call the method of specific controllers.
		 * <ul>
		 * <li>editcontinent, editcountry, editneighbor commands are handled by the map controller's editmap method.</li>
		 * <li>savemap, loadmap, editmap, validatemap commands are also handled by the map controller's respective methods.</li>
		 * <li>gameplayer, showmap commands are handled by the GameEngine's respective methods.</li>
		 * <li>For all the methods called from the various cases here, feedback is shown on the view.</li>
		 * </ul>  
		 */
		@Override
		public void actionPerformed(ActionEvent l_E) {
			try {
				String l_CommandStringFromInput = d_CpView.getCommandInput().trim();
				switch(l_CommandStringFromInput.split(" ")[0]){
				case "editcontinent" : 
				if(d_MapDone==false) {
					try {
						String l_AckMsg = d_MapController.editMap("editcontinent", l_CommandStringFromInput);
						d_CpView.setCommandAcknowledgement(l_AckMsg + "\n");
					}catch(Exception p_Exception) {
						d_CpView.setCommandAcknowledgement(p_Exception.getMessage());
						d_CpView.setCommandAcknowledgement("\n");
					}
				}else {
					d_CpView.setCommandAcknowledgement("Cant Edit Map In This Phase"+"\n");
				}
				break;

				case "editcountry" :
                    {
						if(d_MapDone==false) {
							try {
								String l_AckMsg = d_MapController.editMap("editcountry", l_CommandStringFromInput);
								d_CpView.setCommandAcknowledgement(l_AckMsg + "\n");
							}catch(Exception p_Exception) {
								d_CpView.setCommandAcknowledgement(p_Exception.getMessage());
								d_CpView.setCommandAcknowledgement("\n");
							}
						}else {
							d_CpView.setCommandAcknowledgement("Cant Edit Map In This Phase"+"\n");
						}
                    }
                    break;

				case "editneighbor" :
                    {
						if(d_MapDone==false) {
							try {
								String l_AckMsg = d_MapController.editMap("editneighbor", l_CommandStringFromInput);
								d_CpView.setCommandAcknowledgement(l_AckMsg + "\n");
							}catch(Exception p_Exception) {
								d_CpView.setCommandAcknowledgement(p_Exception.getMessage());
								d_CpView.setCommandAcknowledgement("\n");
							}
						} else {
							d_CpView.setCommandAcknowledgement("Cant Edit Map In This Phase"+"\n");
						}
                    }
                    break;

				case "showmap": 
					{
						showMap(d_MapDone);
                    }
                    break;

				case "savemap":
					{
                    }
                    break;

				case "editmap":
					{
                    }
                    break;

				case "validatemap":
					{
                    }
                    break;

				case "loadmap": 
				    {

					}
					break;

				case "gameplayer":
					{
                    }
                    break;

				case "assigncountries":
					{
					}
					break;

				
				default:
					d_CpView.setCommandAcknowledgement("Invalid Command. Please try again.\n");
					break;
				}
				d_CpView.setCommandInput("");
			}catch(Exception p_Exception) {
				System.out.println("Exception in ActionPerformed Method in ActionListener : " + p_Exception.getMessage());
			}
		}
	}

	/**
	 * This is a method to show all countries and continents, armies on each country, ownership, and connectivity
	 * <ul>
	 * <li>Map Phase : For Each Continent in Continent List, For each country in that continent, For each neighbor in that country</li>
	 * <li>Game Phase : Apart from continent, country and neighbors, it also shows player, thier ownership and their number of armies. </li>
	 * </ul>
	 * 
	 * @param p_BooleanForGamePhaseStarted takes boolean value to show map for map phase or game phase
	 */
	public void showMap(Boolean p_BooleanForGamePhaseStarted) {
		if(p_BooleanForGamePhaseStarted) {
			d_PlayerList = d_GameModelNew.getAllPlayers();
			ArrayList<Continent> l_ContinentList = d_GameModelNew.getMap().getContinentList();
			if(l_ContinentList.size()>0) {
				d_CpView.setCommandAcknowledgement("\n");
				for(Continent l_Continent:l_ContinentList) {
					d_CpView.setCommandAcknowledgement("Continent: "+l_Continent.getContinentName() + "\n");
					ArrayList<Country> l_CountryList = l_Continent.getCountryList();
					d_CpView.setCommandAcknowledgement("\n");
					for(Country l_Country:l_CountryList) {
						d_CpView.setCommandAcknowledgement("Country: "+ l_Country.getCountryName());
						if(this.d_PlayerList!=null) {
							for(Player l_Player: d_PlayerList) {
								if(l_Player.getCountryList().contains(l_Country)) {
									d_CpView.setCommandAcknowledgement("\n"+"-->Owner: "+l_Player.getPlayerName() );
									d_CpView.setCommandAcknowledgement("\n"+"-->Armies deployed: "+l_Country.getNoOfArmies());
								}
							}
						}
						ArrayList<String> l_NeighborList = l_Country.getBorder();
						if(l_NeighborList.size()>0) {
							d_CpView.setCommandAcknowledgement("\n"+"--> Borders : ");
							for(String l_Str:l_NeighborList) {
								d_CpView.setCommandAcknowledgement(l_Str+ ",");
							}	
						}
						d_CpView.setCommandAcknowledgement("\n");
					}
					d_CpView.setCommandAcknowledgement("\n");
				}
			}
		} else {
			ArrayList<Continent> l_ContinentList = d_GameModelNew.getMap().getContinentList();
			if(l_ContinentList.size()>0) {
				d_CpView.setCommandAcknowledgement("\n");
				for(Continent l_Continent:l_ContinentList) {
					d_CpView.setCommandAcknowledgement("Continent: "+l_Continent.getContinentName() + "\n");
					ArrayList<Country> l_CountryList = l_Continent.getCountryList();
					d_CpView.setCommandAcknowledgement("Countries:"+"\n");
					for(Country l_Country:l_CountryList) {
						d_CpView.setCommandAcknowledgement(l_Country.getCountryName());
						ArrayList<String> l_NeighborList = l_Country.getBorder();
						if(l_NeighborList.size()>0) {
							d_CpView.setCommandAcknowledgement("--> Borders : ");
							for(String l_Str:l_NeighborList) {
								d_CpView.setCommandAcknowledgement(l_Str+ " ");
							}
						}
						d_CpView.setCommandAcknowledgement("\n");
					}
					d_CpView.setCommandAcknowledgement("\n");
				}
			}
		}
	}

}
