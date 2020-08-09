using MISA.Entities;

namespace MISA.DL.Interface
{
    public interface IPositionDL
    {
        Position getPositionByCode(string positionCode);
    }
}
