using System;
using System.Runtime.Serialization;

namespace CRUD.Controle.Model.Result
{
    [DataContract]
    [Serializable]
    public class Result<T>
    {
        private bool error = false;
        private bool warning = false;
        private string message;

        [DataMember]
        public bool Error
        {
            get
            {
                return this.error;
            }
            set
            {
                this.error = value;
            }
        }

        [DataMember]
        public bool Warning
        {
            get
            {
                return this.warning;
            }
            set
            {
                this.warning = value;
            }
        }

        [DataMember]
        public string Message
        {
            set
            {
                this.message = value;
            }
            get
            {
                return this.message;
            }
        }

        [DataMember]
        public T Item { get; set; }

        public void setMessage(string message, Enum.ErrorType type)
        {
            this.message = message;

            this.error = type == Enum.ErrorType.Error;
            this.warning = type == Enum.ErrorType.Warning;
        }
    }
}
