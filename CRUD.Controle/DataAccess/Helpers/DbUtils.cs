using System;
using System.Collections.Generic;

// Classe que vai extrair valores tipados dos objetos do Dapper, 
// tratando as conversões tanto para string (com trim), 
// DateTime e outros tipos, com o fallback para valores padrão em caso de erro.

namespace CRUD.Controle.DataAccess.Helpers
{
    internal static class DbUtils
    {
        public static T GetDynamicValueByProperty<T>(dynamic item, string property, bool trimString = false)
        {
            if ((item as IDictionary<string, object>) != null)
            {
                var dict = item as IDictionary<string, object>;

                if (dict.ContainsKey(property))
                {
                    if (dict[property] == null || dict[property] == DBNull.Value)
                    {
                        return default(T);
                    }

                    if (typeof(T) == typeof(string))
                    {
                        string value = dict[property].ToString();
                        if (trimString)
                        {
                            value = value.Trim();
                        }
                        return (T)Convert.ChangeType(value, typeof(T));
                    }

                    if (typeof(T) == typeof(DateTime) || typeof(T) == typeof(DateTime?))
                    {
                        DateTime dateValue = Convert.ToDateTime(dict[property]);
                        if (dateValue == DateTime.MinValue)
                        {
                            return default(T);
                        }
                        return (T)Convert.ChangeType(dateValue, typeof(T));
                    }

                    try
                    {
                        return (T)Convert.ChangeType(dict[property], typeof(T));
                    }
                    catch
                    {
                        return default(T);
                    }
                }
            }

            return default(T);
        }
    }
}