import requests

API_URL = "https://api.openweathermap.org/data/2.5/weather?"
API_KEY = "d3606dad4f3cb4e5b81018dbd6ee2445"


def get_weather_data(city):
    url = "{}q={}&appid={}".format(API_URL, city, API_KEY)
    response = requests.get(url)

    if response.status_code != 200:
        print("Error in request! Please make sure the input is correct and try again.")
        return

    data = response.json()
    return data


def print_data(data):
    print("\t{}, {}".format(data["name"], data["sys"]["country"]))
    print("\tCurrent weather: {}".format(data["weather"][0]["main"]))
    print("\tTemperature is %2.1f" % (data["main"]["temp"] - 273.15) + u'\N{DEGREE SIGN}' + "C")
    print("\tAtmospheric pressure is %i hPa" % (data["main"]["pressure"]))
    print("\tHumidity is %i" % (data["main"]["humidity"]) + "%")
    return


def main():
    print("Weather information")
    running = True
    while running:
        city = input("\nWhich city would you like to get weather data on? ")

        data = get_weather_data(city)
        if data is not None:
            print_data(data)

            again = input("\nWould you like to look up another city? [Y/N] ")
            while again.lower() != "n" and again.lower() != "y":
                again = input("\twrong input, please enter Y or N: ")

            if again.lower() == 'n':
                running = False


if __name__ == "__main__":
    main()
