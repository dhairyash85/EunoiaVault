import React, { useEffect } from 'react';
import useMeditationStaking from '../hooks/useMeditationStakingContract';
import { ethers } from 'ethers';

const MeditationStakingComponent = () => {
  const {
    provider,
    userData,
    isLoading,
    isStaking,
    register,
    stake,
    checkIn,
    withdraw,
  } = useMeditationStaking();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {!userData ? (
        <h1>hello</h1>
      ) : (
        <div>
          <p>Stake Amount: {Number(ethers.utils.formatEther(userData.stakeAmount))} ETH</p>
          <p>UserAddress {userData.userAddress} </p>
          <p>Adherence Count: {Number(userData.adherenceCount)}</p>
          <button onClick={() => stake('0.1')}>Stake 0.1 ETH</button>
          <button onClick={checkIn}>Check-in</button>
          <button onClick={withdraw}>Withdraw</button>
          <button onClick={register}>Register</button>
        </div>
      )}
    </div>
  );
};

export default MeditationStakingComponent;
