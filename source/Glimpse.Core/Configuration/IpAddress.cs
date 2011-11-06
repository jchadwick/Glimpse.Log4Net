using System.Configuration;
using System.Net;
using LukeSkywalker.IPNetwork;

namespace Glimpse.Core.Configuration
{
    public class IpAddress : ConfigurationElement
    {
        [ConfigurationProperty("address")]
        public string Address
        {
            get
            {
                if(string.IsNullOrEmpty(this["address"].ToString()))
                    return null;

                IPAddress result;

                if (IPAddress.TryParse(this["address"].ToString(), out result))
                    return result.ToString();

                throw new ConfigurationErrorsException("Invalid IP address found in glimpse\\ipAddresses: " + this["address"]);
            }
            set { this["address"] = value; }
        }
        
        [ConfigurationProperty("addressRange")]
        public string AddressRange
        {
            get
            {
                if(string.IsNullOrEmpty(this["addressRange"].ToString()))
                    return null;

                IPNetwork result;

                if (IPNetwork.TryParse(this["addressRange"].ToString(), out result))
                    return result.ToString();

                throw new ConfigurationErrorsException("Invalid IP address range found in glimpse\\ipAddresses: " + this["addressRange"]);
            }
            set { this["addressRange"] = value; }
        }

        public override string ToString()
        {
            if (string.IsNullOrEmpty(Address))
                return AddressRange;

            return Address;
        }
    }
}