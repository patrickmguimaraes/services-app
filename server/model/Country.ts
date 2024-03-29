import { Person} from "./Person";
import { JuridicalPerson} from "./JuridicalPerson";
import { IdentificationDocument} from "./IdentificationDocument";
import { State} from "./State";
import { Language} from "./Language";
import { Category} from "./Category";
import { ScreenApproval} from "./ScreenApproval";
import { Bank} from "./Bank";
import { Currency} from "./Currency";
import { DigitalWallet} from "./DigitalWallet";
import { CreditCardBrand} from "./CreditCardBrand";
import { MainBankAccount} from "./MainBankAccount";
import { EmailController} from "./EmailController";
import { SMSController} from "./SMSController";
import { Log} from "./Log";
import { LogBackuped} from "./LogBackuped";
import { Tax} from "./Tax";
import { TagReference} from "./TagReference";

export class Country {
  pkCountry: number;
  name: string;
  abbreviation: string;
  status: number = 0;
  timeZone: Number;
  language: Language = new Language();
  birthCountryPersonList: Array<Person> = new Array<Person>();
  originCountryJuridicalPersonList: Array<JuridicalPerson> = new Array<JuridicalPerson>();
  countryIdentificationDocumentList: Array<IdentificationDocument> = new Array<IdentificationDocument>();
  countryStateList: Array<State> = new Array<State>();
  countryCategoryList: Array<Category> = new Array<Category>();
  countryScreenApprovalList: Array<ScreenApproval> = new Array<ScreenApproval>();
  countryBankList: Array<Bank> = new Array<Bank>();
  countryCurrencyList: Array<Currency> = new Array<Currency>();
  countryLanguageList: Array<Language> = new Array<Language>();
  countryDigitalWalletList: Array<DigitalWallet> = new Array<DigitalWallet>();
  countryCreditCardBrandList: Array<CreditCardBrand> = new Array<CreditCardBrand>();
  countryMainBankAccountList: Array<MainBankAccount> = new Array<MainBankAccount>();
  countryEmailControllerList: Array<EmailController> = new Array<EmailController>();
  countrySMSControllerList: Array<SMSController> = new Array<SMSController>();
  countryLogList: Array<Log> = new Array<Log>();
  countryLogBackupedList: Array<LogBackuped> = new Array<LogBackuped>();
  countryTaxList: Array<Tax> = new Array<Tax>();
  countryTagReferenceList: Array<TagReference> = new Array<TagReference>();
}