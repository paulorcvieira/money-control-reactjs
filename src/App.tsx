import { useCallback, useState } from 'react'

import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionModal } from './components/NewTransactionModal';

import { GlobalStyle } from './styles/global';

function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

  const handleOpenNewTransaction = useCallback(() => {
    setIsNewTransactionModalOpen(true)
  }, [])

  const handleCloseNewTransaction = useCallback(() => {
    setIsNewTransactionModalOpen(false)
  }, [])

  return (
    <>
      <Header onOpenNewTransaction={handleOpenNewTransaction} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransaction}
      />
      <GlobalStyle />
    </>
  );
}

export default App;
