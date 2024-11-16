// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";





/// @custom:security-contact daolabb@gmail.com


contract Trustify is ERC20, ERC20Burnable, ERC20Pausable, Ownable, ERC20Permit, ERC20Votes 

{

    // Definición de Variables

    uint8 token_compra;  // variable que toma la cantidad de tokens asignados al validar la entrega
    string status; // Vaarible que detalla el estatus del usuario ( Principiante, Propulsor y Embajador)
    uint8 total_token; //Acumulado de tokens (Por adreesss)

   



    constructor(address initialOwner)
        ERC20("trustify", "TRUS")
        Ownable(initialOwner)
        ERC20Permit("trustify")
    {}

    // Función de asignación de tokens por compra validada - Grupo 1




    // Función de asignación de status - Grupo 2

    

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function clock() public view override returns (uint48) {
        return uint48(block.timestamp);
    }

    // solhint-disable-next-line func-name-mixedcase
    function CLOCK_MODE() public pure override returns (string memory) {
        return "mode=timestamp";
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable, ERC20Votes)
    {
        super._update(from, to, value);
    }

    function nonces(address owner)
        public
        view
        override(ERC20Permit, Nonces)
        returns (uint256)
    {
        return super.nonces(owner);
    }
}