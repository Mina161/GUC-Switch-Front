import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from "../actions/types";

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
};

const quotes = [
  "You can always look up to others for inspiration but never for comparison. ~Angel Graff, Self Esteem",
  "The only real mistake is the one from which we learn nothing. ~Henry Ford",
  "Energy and initiative count as much as talent and luck. ~Will Peters",
  "Your worth consists in what you are and not in what you have. ~Thomas Edison",
  "Determination, motivation, and dedication are what you need for inspiration. ~Danielle Duckery, Words For The Occasion",
  "All wounds heal with time. ~Tahiri Veila , Star War Quotes",
  "No one is useless in this world who lightens the burden of it to anyone else. ~Charles Dickens",
  "We will not be remembered by our words, but by our kind deeds. ~Author Unknown",
  "The only thing that can grow is the thing you give energy to. ~Ralph Waldo Emerson",
  "Be positive! Negativity doesn't get you anywhere. ~Peter W. Murphy",
  "What have you done to inspire or help others? ~Stephanie Carroll, My Conversations with God Book 4",
  "No greater gift there is, than a generous heart. ~Yoda",
  "I enjoy every day, because I choose to. ~Tony Clark",
  "The doors of wisdom are never shut. ~Benjamin Franklin",
  "Your big opportunity may be right where you are now. ~Napoleon Hill",
  "Goals help you channel your energy into action. ~Les Brown",
  "A hero is someone who has given his or her life to something bigger than oneself. ~Joseph Campbell",
  "Positive anything is better than negative nothing. ~Elbert Hubbard",
  "When we give cheerfully and accept gratefully, everyone is blessed. ~Maya Angelou",
  "A wise man will make more opportunities than he finds. ~Francis Bacon",
  "A man's true wealth is the good he does in the world. ~Kahlil Gibran",
  "The most important thing about getting somewhere is starting right where we are. ~Bruce Barton",
];

const getRandomQuote = () => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

export default function store(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("switchingAppUser", JSON.stringify(action.payload));
      return {
        ...state,
        user: payload,
        isLoading: false,
        isError: false,
        quote: getRandomQuote()
      };
    case LOGIN_FAIL:
      localStorage.removeItem("switchingAppUser");
      return {
        ...state,
        user: null,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
}
